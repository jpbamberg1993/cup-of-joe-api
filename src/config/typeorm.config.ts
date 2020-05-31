import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from "config";

const dbConfig = config.get("db");

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  username: dbConfig.username,
  password: dbConfig.password,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [
    "dist/migration/*.js"
  ],
  cli: {
    migrationsDir: "src/migration"
  },
  synchronize: false,
  logging: true
}
