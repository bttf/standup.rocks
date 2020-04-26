import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const { NODE_ENV, PGDATABASE, PGUSER, PGPASSWORD, PGHOST, PGPORT } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  port: PGPORT,
  dialect: 'postgres',
  dialectOptions: { ssl: NODE_ENV === 'production' },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: false,
  },
});

const db = {};
const modelsDirPath = path.resolve(__dirname, 'models');

fs.readdirSync(modelsDirPath)
  .filter(filename => filename.indexOf('.') !== 0)
  .forEach(filename => {
    const model = sequelize.import(path.join(modelsDirPath, filename));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  const model = db[modelName];

  if (typeof model.initialize === 'function') {
    model.initialize(sequelize, Sequelize);
  }

  if (typeof model.associate === 'function') {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
