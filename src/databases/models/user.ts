import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface userAttributes {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  status_user: boolean;
  status_notif: boolean;
  refresh_token?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type userPk = "id";
export type userId = user[userPk];
export type userOptionalAttributes = "id" | "refresh_token" | "createdAt" | "updatedAt";
export type userCreationAttributes = Optional<userAttributes, userOptionalAttributes>;

export class user extends Model<userAttributes, userCreationAttributes> implements userAttributes {
  id!: number;
  name!: string;
  username!: string;
  email!: string;
  password!: string;
  role!: string;
  status_user!: boolean;
  status_notif!: boolean;
  refresh_token?: string;
  createdAt!: Date;
  updatedAt!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof user {
    return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.DECIMAL,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "users_username_key"
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status_user: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    status_notif: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    paranoid: true,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "users_username_key",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
    ]
  }) as typeof user;
  }
}
