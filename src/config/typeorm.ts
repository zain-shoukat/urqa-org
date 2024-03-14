import { DataSourceOptions, DataSource } from 'typeorm';
import { database } from './env.js';

const db = {
  host: database.dbHost,
  port: database.dbPort,
  synchronize: false,
  username: database.dbUserName,
  password: database.dbPassword,
  database: database.dbName,
  schema: database.schema
};

const config: DataSourceOptions = {
  type: 'postgres',
  host: db.host,
  port: db.port,
  username: db.username,
  password: db.password,
  database: db.database,
  schema: db.schema,
  synchronize: false,
  logging: 'all',
  migrationsRun: true,
  entities: ['dist/app/models/entities/*.js'],
  migrations: ['dist/app/models/migrations/**/*.js'],
  migrationsTableName: 'organization_service_migrations',
};

const myDataSource = new DataSource(config);

export default myDataSource;
