import fs from "fs";
import path from "path";
import Sequelize from "sequelize";

const {
  NODE_ENV,
  STANDUP_ROCKS_PGDATABASE,
  STANDUP_ROCKS_PGUSER,
  STANDUP_ROCKS_PGPASSWORD,
  STANDUP_ROCKS_PGHOST,
  STANDUP_ROCKS_PGPORT
} = process.env;

const sequelize = new Sequelize(STANDUP_ROCKS_PGDATABASE, STANDUP_ROCKS_PGUSER, STANDUP_ROCKS_PGPASSWORD, {
  host: STANDUP_ROCKS_PGHOST,
  port: STANDUP_ROCKS_PGPORT,
  dialect: "postgres",
  dialectOptions: {
    ssl:
      NODE_ENV === "production"
        ? {
            require: true,
            rejectUnauthorized: false
          }
        : false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false
  }
});

const db = {};
const modelsPath = path.join(__dirname, "models");

fs.readdirSync(modelsPath)
  .filter(filename => filename.indexOf(".") !== 0)
  .forEach(filename => {
    const model = sequelize.import(path.join(modelsPath, filename));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  const model = db[modelName];

  if (typeof model.initialize === "function") {
    model.initialize(sequelize, Sequelize);
  }

  if (typeof model.associate === "function") {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
