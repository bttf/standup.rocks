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
    CREATE TABLE v1.action_items (
      id SERIAL PRIMARY KEY,
      uuid uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
      created_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
      text TEXT,
      standup_id INTEGER NOT NULL REFERENCES v1.standups(id) ON DELETE CASCADE
    )
  `;
  return db.runSql(sql);
};

exports.down = function(db) {
  const sql = `
    DROP TABLE v1.action_items;
  `;
  return db.runSql(sql);
};

exports._meta = {
  version: 1,
};
