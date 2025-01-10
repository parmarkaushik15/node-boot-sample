import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize";
import { models } from "./Model";
import { readProperties } from "node-boot-core";

const config:any = readProperties();
const connection = new Sequelize(
  config["db.name"],
  config["db.user"],
  config["db.password"],
  {
    host: config["db.host"],
    port: Number(config["db.port"]),
    dialect: config["db.dialect"] ? (config["db.dialect"] as Dialect) : "mysql",
    models: models,
    logging: false,
  }
);
export default connection;

export * from "./Model";
export * from "./Repository";

export const commonAttributes = ["id", "status", "createdAt"];
