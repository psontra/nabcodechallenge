import { Optional } from 'sequelize';
import {
  Model,
  Column,
  Table,
  PrimaryKey,
  HasMany,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  DataType,
  Default,
} from 'sequelize-typescript';

import { Product } from './Product';

interface CategoryAttributes {
  id: string;
  name: string;
}

type CategoryCreationAttributes = Optional<CategoryAttributes, 'id'>;

@Table({
  tableName: 'categories',
})
class Category extends Model<CategoryAttributes, CategoryCreationAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id: string;

  @Column
  public name: string;

  @HasMany(() => Product)
  public products: Product[];

  @CreatedAt
  public creationDate: Date;

  @UpdatedAt
  public updatedOn: Date;

  @DeletedAt
  public deletionDate: Date;
}

export default Category;
