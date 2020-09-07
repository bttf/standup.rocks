import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const {NODE_ENV, PGDATABASE, PGUSER, PGPASSWORD, PGHOST, PGPORT} = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  port: PGPORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: NODE_ENV === 'production',
      rejectUnauthorized: false,
    },
  },
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
const modelsPath = path.join(__dirname, 'models');

fs.readdirSync(modelsPath)
  .filter(filename => filename.indexOf('.') !== 0)
  .forEach(filename => {
    const model = sequelize.import(path.join(modelsPath, filename));
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
