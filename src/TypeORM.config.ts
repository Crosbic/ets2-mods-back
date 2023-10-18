import { DataSource, DataSourceOptions } from 'typeorm'

export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: '13579',
  database: 'ets2-mods',
  entities: ['./*.entity.{ts,js}'],
  synchronize: true,
}

export default new DataSource(ormConfig)
