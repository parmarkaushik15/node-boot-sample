import { Column, DataType, Default, Model } from "sequelize-typescript";

export class Base extends Model {
  @Default(1)
  @Column({ type: DataType.INTEGER })
  status: number | any;

  @Column({ type: DataType.DATE })
  deleteAt: Date | any;

  @Column({ type: DataType.DATE })
  activeAt: Date | any;

  @Column({ type: DataType.DATE })
  inactiveAt: Date | any;

  @Column({ type: DataType.INTEGER })
  createdBy: number | any;

  @Column({ type: DataType.INTEGER })
  updatedBy: number | any;

  @Column({ type: DataType.INTEGER })
  deletedBy: number | any;

  @Column({ type: DataType.INTEGER })
  activeBy: number | any;

  @Column({ type: DataType.INTEGER })
  inactiveBy: number | any;
}
