import { Optional } from 'sequelize';
import {
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import { Product } from './Product';

interface BrandAttributes {
  id: string;
  name: string;
}

type BrandCreationAttributes = Optional<BrandAttributes, 'id'>;

@Table({
  tableName: 'brands',
})
class Brand extends Model<BrandAttributes, BrandCreationAttributes> {
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

export default Brand;
