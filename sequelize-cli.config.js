module.exports = {
    development: {
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '1234',
      database: process.env.DB_NAME || 'graphql_db',
      migrationStorageTableName: 'sequelize_meta',
      migrations: ['src/database/migrations/*.js'],
      seeds: ['src/database/seeders/*.js'],
    },
  };
  