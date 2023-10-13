import * as config from "../config/config";
import { Dialect, Sequelize } from "sequelize";

export const DB_AUTH = new Sequelize({
    dialect: config.DIALECT_AUTH as Dialect,
    host: config.HOST_AUTH,
    port: config.PORT_AUTH,
    database: config.DATABASE_AUTH,
    username: config.USERNAME_AUTH,
    password: config.PASSWORD_AUTH,
    dialectOptions: {
        statement_timeout: 1000,
        idle_in_transaction_session_timeout: 5000
    }
});