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
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE SCHEMA v1;

    CREATE OR REPLACE FUNCTION v1.update_modified_column()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = now() at time zone 'utc';
        RETURN NEW;
    END;
    $$ language 'plpgsql';

    CREATE TABLE v1.teams (
      id SERIAL PRIMARY KEY,
      uuid uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
      created_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
      deleted_at TIMESTAMPTZ,
      name TEXT NOT NULL,
      current_facilitator_idx INTEGER NOT NULL DEFAULT 0,
      code TEXT NOT NULL
    );

    CREATE UNIQUE INDEX v1_teams_name on v1.teams(LOWER(name));
    CREATE UNIQUE INDEX v1_teams_code on v1.teams(LOWER(code));

    CREATE TABLE v1.team_settings (
      id SERIAL PRIMARY KEY,
      uuid uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
      created_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
      deleted_at TIMESTAMPTZ,
      password TEXT,
      links JSONB NOT NULL DEFAULT '{}'::jsonb,
      team_id INTEGER NOT NULL REFERENCES v1.teams(id)
    );

    CREATE INDEX v1_team_settings_team_id on v1.team_settings(team_id);

    CREATE TABLE v1.facilitators (
      id SERIAL PRIMARY KEY,
      uuid uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
      created_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
      deleted_at TIMESTAMPTZ,
      name TEXT NOT NULL,
      idx INTEGER NOT NULL,
      team_id INTEGER NOT NULL REFERENCES v1.teams(id)
    );

    CREATE INDEX v1_facilitators_idx on v1.facilitators(idx);
    CREATE INDEX v1_facilitators_team_id on v1.facilitators(team_id);

    CREATE TABLE v1.absentees (
      id SERIAL PRIMARY KEY,
      uuid uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
      created_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
      deleted_at TIMESTAMPTZ,
      team_id INTEGER NOT NULL REFERENCES v1.teams(id),
      facilitator_id INTEGER NOT NULL REFERENCES v1.facilitators(id)
    );

    CREATE INDEX v1_absentees_team_id on v1.absentees(team_id);
    CREATE INDEX v1_absentees_facilitators_id on v1.absentees(facilitator_id);
  `;
  return db.runSql(sql);
};

exports.down = function(db) {
  const sql = `
    DROP SCHEMA v1;
  `;
  return db.runSql(sql);
};

exports._meta = {
  version: 1,
};
