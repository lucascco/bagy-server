import { Product } from '@modules/product/entities/Product';
import { FakeProductRepository } from '@modules/product/repository/fakes/FakeProductRepository';
import { FakeCustomerRepository } from '@modules/customer/repository/fakes/FakeCustomerRepository';
import { FakeOrderProductRepository } from '../repository/fakes/FakeOrderProductRepository';
import { FakeOrderRepository } from '../repository/fakes/FakeOrderRepository';
import { OrderService } from './order.service';

describe('Order Service', () => {
  let orderService: OrderService;
  let fakeProductRepository: FakeProductRepository;
  let fakeCustomerRepository: FakeCustomerRepository;

  const generateCustomers = () => {
    fakeCustomerRepository.create(
      {
        id: 1,
        street: 'Rua Necessio dos Santos',
        neighborhood: 'SJB',
        city: 'Belo Horizonte',
        state: 'MG',
        country: 'BR',
        number: '110',
        cep: '31515040',
      },
      {
        id: 1,
        name: 'User Test 1',
        email: 'user@gmail.com',
        cpf: '12312312',
        dtBirth: '1991-02-11',
      },
    );
  };

  const generateProducts = () => {
    fakeProductRepository.create({
      id: 1,
      name: 'Macbook',
      qttStock: 10,
      description: 'One Macbook',
      price: 5000,
      image: '',
      weight: 4,
    });

    fakeProductRepository.create({
      id: 2,
      name: 'Notebook Dell',
      qttStock: 10,
      description: 'OneNotebook Dell',
      price: 5000,
      image: '',
      weight: 4,
    });
  };

  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    fakeCustomerRepository = new FakeCustomerRepository();
    generateProducts();
    generateCustomers();
    orderService = new OrderService(
      new FakeOrderRepository(),
      new FakeOrderProductRepository(),
      fakeProductRepository,
      fakeCustomerRepository,
    );
  });

  it('Should be create one order', async () => {
    const resOrder = await orderService.execute({
      idCustomer: 1,
      installment: 3,
      listProducts: [
        { id: 1, qtt: 2 },
        { id: 2, qtt: 2 },
      ],
    });
    const resExpect = {
      order: {
        id: 1,
        customer: { name: 'User Test 1', id: 1 },
        installment: 3,
        status: 'approved',
        dtOrder: resOrder.order.dtOrder,
      },
      products: [
        { id: 1, name: 'Macbook', qttStock: 8 },
        { id: 2, name: 'Notebook Dell', qttStock: 8 },
      ],
    };
    expect(resOrder).toMatchObject(resExpect);
  });

  it('Should be check if stock is not available given on quantity for one product', () => {
    const productIdOne = fakeProductRepository.products.find(
      fakeProd => fakeProd.id === 1,
    );
    const isAvailable = orderService.checkSotckAvailable(
      { id: 1, qtt: 12 },
      productIdOne as Product,
    );
    expect(isAvailable).toBeFalsy();
  });

  it('Should be check if stock is available given on quantity for one product', () => {
    const productIdOne = fakeProductRepository.products.find(
      fakeProd => fakeProd.id === 1,
    );
    const isAvailableLess = orderService.checkSotckAvailable(
      { id: 1, qtt: 8 },
      productIdOne as Product,
    );
    const isAvailableEqual = orderService.checkSotckAvailable(
      { id: 1, qtt: 10 },
      productIdOne as Product,
    );
    expect(isAvailableLess).toBeTruthy();
    expect(isAvailableEqual).toBeTruthy();
  });
});
