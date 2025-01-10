import connection from ".";
import { Contact } from "../model/Contact";

export const getConncetion = () => {
  return connection;
};

export const getTransaction = () => {
  return connection.transaction();
};

export const models = [Contact];
