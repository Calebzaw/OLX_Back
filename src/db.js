import { Sequelize } from "sequelize"; // importar o sequelize
import dotenv from 'dotenv';
dotenv.config();

const dbName = process.env.DB_NAME; // passar os dados do .env para as constantes
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;
const dbSchema = process.env.DB_SCHEMA;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "postgres", //informar o tipo de banco que vamos utilizar
  host: dbHost, //o host, neste caso estamos com um banco local
  schema: dbSchema,
});

export default sequelize; //exportar
