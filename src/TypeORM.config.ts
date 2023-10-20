import { DataSource, DataSourceOptions } from 'typeorm'

export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'psql',
  port: 5432,
  username: 'postgres',
  password: '13579',
  database: 'ets2-mods',
  entities: ['./*.entity.{ts,js}'],
  synchronize: true,
}

export default new DataSource(ormConfig)
