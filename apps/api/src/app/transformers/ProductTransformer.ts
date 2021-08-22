import { get } from 'lodash';

import Product from '../models/Product';

type TransformedProduct = Pick<
  Product,
  'id' | 'name' | 'price' | 'color' | 'creationDate'
> & {
  productBrand: {
    id: string;
    name: string;
  };
  productCategory: {
    id: string;
    name: string;
  };
};

const transformProduct = (productData: Product): TransformedProduct => {
  return {
    id: productData.id,
    name: productData.name,
    price: productData.price,
    color: productData.color,
    productBrand: {
      id: productData.brandId,
      name: get(productData.brand, 'name'),
    },
    productCategory: {
      id: productData.categoryId,
      name: get(productData.category, 'name'),
    },
    creationDate: productData.creationDate,
  };
};

export { transformProduct, TransformedProduct };
