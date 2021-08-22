import {Optional} from 'sequelize';
import { Column, CreatedAt, DataType, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';

interface ActivityAttributes {
  id: string;
  resourceId?: number;
  resourceName: string;
  type: string;
  content: string;
  occurred: Date;
}

type ActivityAttributesCreation = Optional<ActivityAttributes, 'id'>;

@Table({
  tableName: 'activities'
})
class Activity extends Model<ActivityAttributes, ActivityAttributesCreation> {

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id: string;

  @Column
  public resourceId?: number;

  @Column
  public resourceName: string;

  @Column
  public type: string;

  @Column
  public content: string;

  @CreatedAt
  public occurred: Date;
}

export default Activity;
