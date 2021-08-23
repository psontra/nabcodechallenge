process.env['NODE_CONFIG_DIR'] = __dirname + '/../../../config/';

import { Op } from 'sequelize';

import container from '../../common/Ioc/InversifyConfig';
import Types from '../../common/Ioc/Types';
import { IProductService } from './IProductService';

describe('product.service', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
    container.restore();
  });

  describe('getProducts', () => {
    it('should call repository correctly', async () => {
      const filter = [
        {
          name: {
            [Op.eq]: 'unit test',
          },
          price: {
            [Op.gt]: 4500000,
          },
        },
      ];
      const sortBy: [string, string] = ['price', 'ASC'];
      const productRepositoryMock = {
        retrieve: jest.fn(async () => []),
      };

      container.unbind(Types.IProductRepository);
      container
        .bind(Types.IProductRepository)
        .toConstantValue(productRepositoryMock);

      const productService = container.get<IProductService>(
        Types.IProductService,
      );

      await productService.getProducts(filter, sortBy);

      expect(productRepositoryMock.retrieve).toHaveBeenCalledTimes(1);
      expect(productRepositoryMock.retrieve).toHaveBeenCalledWith(
        [
          {
            name: {
              [Op.eq]: 'unit test',
            },
            price: {
              [Op.gt]: 4500000,
            },
          },
        ],
        ['price', 'ASC'],
      );
    });
  });
});
