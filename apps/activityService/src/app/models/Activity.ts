import { Optional } from 'sequelize';
import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

interface ActivityAttributes {
  id: string;
  resourceId?: number;
  resourceName: string;
  type: string;
  content: string;
  occurred: Date;
}

export type ActivityCreationAttributes = Optional<
  ActivityAttributes,
  'id' | 'occurred'
>;

@Table({
  tableName: 'activities',
})
export class Activity extends Model<
  ActivityAttributes,
  ActivityCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id: string;

  @AllowNull
  @Column(DataType.UUID)
  public resourceId?: string;

  @Column
  public resourceName: string;

  @Column
  public type: string;

  @Column
  public content: string;

  @CreatedAt
  public occurred: Date;
}
