import { Op, Transaction, Sequelize, BuildOptions } from "sequelize";

interface IWrite<T> {
  bulkCreate(item: T): Promise<T[]>;
  create(item: T): Promise<T>;
  update(id: number, item: T): Promise<T>;
  delete(id: number): Promise<T>;
  remove(id: number): Promise<T>;
  active(id: number): Promise<T>;
  inactive(id: number): Promise<T>;
}

interface IRead<T> {
  findAll(item: T): Promise<T[]>;
  findOne(item: T): Promise<T>;
  findByPk(id: number): Promise<T>;
  findAndCountAll(item: T): Promise<T>;
  findOneForExists(fieldName: string, fieldValue: any, id?: number): Promise<T>;
}

export abstract class Association<T, C> {
  protected _model: any;
  protected _asscociate: any;
  constructor(model: any, asscociate: any) {
    this._model = model;
    this._asscociate = asscociate;
  }

  async hasMany(foreignKey: string, as: string): Promise<any> {
    return await this._model.hasMany(this._asscociate, {
      foreignKey: foreignKey,
      foreignKeyConstraint: false,
      onDelete: "SET NULL",
      onUpdate: "SET NULL",
      as: as,
    });
  }

  async hasOne(foreignKey: string, as: string): Promise<any> {
    return await this._model.hasOne(this._asscociate, {
      foreignKey: foreignKey,
      foreignKeyConstraint: false,
      onDelete: "SET NULL",
      onUpdate: "SET NULL",
      as: as,
    });
  }

  async belongsTo(foreignKey: string, as: string): Promise<any> {
    return await this._model.belongsTo(this._asscociate, {
      foreignKey: foreignKey,
      foreignKeyConstraint: false,
      onDelete: "SET NULL",
      onUpdate: "SET NULL",
      as: as,
    });
  }
}

export class Option {
  attributes: Array<any> | object | any;
  where: Array<any> | object | any = [];
  required: boolean = false;
  association: object | any = null;
  include: Array<any> | any = [];
  logging: boolean = false;
  order: Array<any> | any = [];
  group: Array<any> | any = [];
  distinct: boolean | string | any = false;
}

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  protected _model: any;
  constructor(model: any) {
    this._model = model;
  }

  getOptions = () => {
    return new Option();
  };

  async bulkCreate(
    payload: Array<any> | any,
    createdBy?: string,
    transaction?: Transaction
  ): Promise<T[]> {
    for (let item of payload) {
      if (item.status == 0) {
        item.inactiveBy = createdBy ? createdBy : undefined;
        item.inactiveAt = new Date();
      } else {
        item.activeBy = createdBy ? createdBy : undefined;
        item.activeAt = new Date();
      }
      item.createdBy = createdBy ? createdBy : undefined;
    }
    return await this._model.bulkCreate(payload, {
      transaction: transaction ? transaction : undefined,
    });
  }

  async create(
    payload: object | any,
    createdBy?: string,
    transaction?: Transaction
  ): Promise<T> {
    if (payload.status == 0) {
      payload.inactiveBy =
        createdBy && !isNaN(Number(createdBy)) ? createdBy : undefined;
      payload.inactiveAt = new Date();
    } else {
      payload.activeBy =
        createdBy && !isNaN(Number(createdBy)) ? createdBy : undefined;
      payload.activeAt = new Date();
    }
    payload.createdBy =
      createdBy && !isNaN(Number(createdBy)) ? createdBy : undefined;
    return await this._model.create(payload, {
      transaction: transaction ? transaction : undefined,
    });
  }

  async update(
    id: number,
    payload: object | any,
    updatedBy?: string,
    transaction?: Transaction
  ): Promise<T> {
    if (payload.status != undefined) {
      if (payload.status == 0) {
        payload.inactiveBy =
          updatedBy && !isNaN(Number(updatedBy)) ? updatedBy : undefined;
        payload.inactiveAt = new Date();
      } else {
        payload.activeBy =
          updatedBy && !isNaN(Number(updatedBy)) ? updatedBy : undefined;
        payload.activeAt = new Date();
      }
    }
    payload.updatedBy =
      updatedBy && !isNaN(Number(updatedBy)) ? updatedBy : undefined;
    return await this._model.update(payload, {
      where: { id: id },
      transaction: transaction ? transaction : undefined,
    });
  }

  async remove(
    id: number,
    deletedBy?: string,
    transaction?: Transaction
  ): Promise<T> {
    return await this._model.update(
      {
        status: -1,
        deletedBy: deletedBy ? deletedBy : undefined,
        deleteAt: new Date(),
      },
      {
        where: { id: id },
        transaction: transaction ? transaction : undefined,
      }
    );
  }

  async delete(id: number, transaction?: Transaction): Promise<T> {
    return await this._model.destroy({
      where: { id: id },
      transaction: transaction ? transaction : undefined,
    });
  }

  async active(id: number, activeBy?: string, transaction?: any): Promise<any> {
    return await this._model.update(
      { status: 1, activeBy: activeBy, activeAt: new Date() },
      { where: { id: id }, transaction: transaction ? transaction : undefined }
    );
  }

  async inactive(
    id: number,
    inactiveBy?: string,
    transaction?: any
  ): Promise<any> {
    return await this._model.update(
      { status: 1, inactiveBy: inactiveBy, inactiveAt: new Date() },
      { where: { id: id }, transaction: transaction ? transaction : undefined }
    );
  }

  async findAll(options: object | any): Promise<T[]> {
    return await this._model.findAll(options);
  }

  async findOne(options: object | any): Promise<T> {
    return await this._model.findOne(options);
  }

  async findAndCountAll(options: object | any): Promise<T> {
    return await this._model.findAndCountAll(options);
  }

  async findByPk(id: number): Promise<T> {
    return await this._model.findByPk(id);
  }

  async findOneForExists(
    fieldName: string,
    fieldValue: any,
    id?: number
  ): Promise<T> {
    const where: any = [];
    where.push({ [fieldName]: fieldValue });
    where.push({ status: { [Op.ne]: -1 } });
    if (id) {
      where.push({ id: { [Op.ne]: id } });
    }
    return await this._model.findOne({
      where: where,
      logging: false,
    });
  }
}
