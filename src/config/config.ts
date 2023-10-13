import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// SERVER
export const PORT_SERVER = Number(process.env.PORT_SERVER);

// DATABASE AUTHENTICATION
export const HOST_AUTH = String(process.env.HOST_AUTH);
export const USERNAME_AUTH = String(process.env.USERNAME_AUTH);
export const PASSWORD_AUTH = String(process.env.PASSWORD_AUTH);
export const DATABASE_AUTH = String(process.env.DATABASE_AUTH);
export const DIALECT_AUTH = String(process.env.DIALECT_AUTH);
export const PORT_AUTH = Number(process.env.PORT_AUTH);