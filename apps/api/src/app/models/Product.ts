import { Optional } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  PrimaryKey,
  Table,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Default,
} from 'sequelize-typescript';

import Brand from './Brand';
import Category from './Category';

interface ProductAttributes {
  id: string;
  name: string;
  price: number;
  brandId: string;
  color: string;
  categoryId: string;
}

export type ProductCreationAttributes = Optional<ProductAttributes, 'id'>;

@Table({
  tableName: 'products',
  paranoid: true,
})
export class Product extends Model<
  ProductAttributes,
  ProductCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id: string;

  @Column
  public name: string;

  @Column(DataType.FLOAT)
  public price: number;

  @ForeignKey(() => Brand)
  @Column(DataType.UUID)
  public brandId: string;

  @BelongsTo(() => Brand)
  public brand: Brand;

  @Column
  public color: string;

  @ForeignKey(() => Category)
  @Column(DataType.UUID)
  public categoryId: string;

  @BelongsTo(() => Category)
  public category: Category;

  @CreatedAt
  public creationDate: Date;

  @UpdatedAt
  public updatedOn: Date;

  @DeletedAt
  public deletionDate: Date;
}
