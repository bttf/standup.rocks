'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  const sql = `
    CREATE TABLE v1.standups (
      id SERIAL PRIMARY KEY,
      uuid uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
      created_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
      deleted_at TIMESTAMPTZ,
      run_date DATE NOT NULL,
      team_id INTEGER NOT NULL REFERENCES v1.teams(id) ON DELETE CASCADE,
      facilitator_id INTEGER NOT NULL REFERENCES v1.facilitators(id)
    );
  `;
  return db.runSql(sql);
};

exports.down = function(db) {
  const sql = `
    DROP TABLE v1.standups;
  `;
  return db.runSql(sql);
};

exports._meta = {
  "version": 1
};
