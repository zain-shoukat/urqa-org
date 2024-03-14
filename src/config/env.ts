
import * as dotenv from 'dotenv';
dotenv.config(); // load env variables
const {
  CONTAINER_NAME,
  CONTAINER_PORT,
  EXPOSED_PORT,
  MS_NAME,
  DOMAIN_NAME,
  DB_HOST,
  DB_PORT,
  DB_ID,
  DB_PASSWORD,
  DB_NAME,
  NODE_ENV,
  SCHEMA
} = process.env;

const server = {
  container: String(CONTAINER_NAME),
  port: String(CONTAINER_PORT),
  exposed: String(EXPOSED_PORT),
  microservice: String(MS_NAME),
  domain: String(DOMAIN_NAME),
  nodeEnv: String(NODE_ENV),
};
const database = {
  dbHost: String(DB_HOST),
  dbPort: Number(DB_PORT),
  dbUserName: String(DB_ID),
  dbPassword: String(DB_PASSWORD),
  dbName: String(DB_NAME),
  schema: String(SCHEMA)
};

export { server, database };
