import { Column, DataType, Table } from "sequelize-typescript";
import { Base } from "./Base";

@Table
export class Contact extends Base {
  @Column({ type: DataType.STRING })
  contactName: string | any;

  @Column({ type: DataType.STRING })
  contactEmail: string | any;

  @Column({ type: DataType.STRING })
  contactPhone: string | any;

  @Column({ type: DataType.STRING })
  contactWebsite: string | any;

  @Column({ type: DataType.STRING })
  contactSubject: string | any;

  @Column({ type: DataType.TEXT("long") })
  contactMessage: string | any;
}
