'use strict';

/* eslint-disable */
var dbm;
var type;
var seed;
/* eslint-enable */

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = db => {
  const sql = `
ALTER TABLE standup.users
ADD COLUMN name TEXT NOT NULL DEFAULT 'User';

-- teams
CREATE TABLE standup.teams (
  id SERIAL PRIMARY KEY,
  uuid uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  emoji CHARACTER(1),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER standup_teams_update
BEFORE UPDATE ON standup.teams FOR EACH ROW EXECUTE PROCEDURE standup.update_modified_column();


-- teams_users
CREATE TABLE standup.teams_users (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES standup.users ON DELETE CASCADE,
  team_id INTEGER NOT NULL REFERENCES standup.teams ON DELETE CASCADE
);

CREATE INDEX standup_teams_users_user_id ON standup.teams_users(user_id);
CREATE INDEX standup_teams_users_team_id ON standup.teams_users(team_id);

-- projects
CREATE TABLE standup.projects (
  id SERIAL PRIMARY KEY,
  uuid uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  team_id INTEGER NOT NULL REFERENCES standup.teams ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX standup_projects_team_id ON standup.projects(team_id);
CREATE TRIGGER standup_projects_update
BEFORE UPDATE ON standup.projects FOR EACH ROW EXECUTE PROCEDURE standup.update_modified_column();

-- projects_users
CREATE TABLE standup.projects_users (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES standup.users ON DELETE CASCADE,
  project_id INTEGER NOT NULL REFERENCES standup.projects ON DELETE CASCADE
);

CREATE INDEX standup_projects_users_user_id ON standup.projects_users(user_id);
CREATE INDEX standup_projects_users_project_id ON standup.projects_users(project_id);

-- standups
CREATE TABLE standup.standups (
  id SERIAL PRIMARY KEY,
  uuid uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  start_time TIME WITHOUT TIME ZONE NOT NULL,
  team_id INTEGER NOT NULL REFERENCES standup.teams ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX standup_standups_team_id ON standup.standups(team_id);
CREATE TRIGGER standup_standups_update
BEFORE UPDATE ON standup.standups FOR EACH ROW EXECUTE PROCEDURE standup.update_modified_column();

-- standups_projects
CREATE TABLE standup.standups_projects (
  id SERIAL PRIMARY KEY,
  standup_id INTEGER NOT NULL REFERENCES standup.standups ON DELETE CASCADE,
  project_id INTEGER NOT NULL REFERENCES standup.projects ON DELETE CASCADE
);

CREATE INDEX standup_standups_projects_standup_id ON standup.standups_projects(standup_id);
CREATE INDEX standup_standups_projects_project_id ON standup.standups_projects(project_id);

-- standup_meetings
CREATE TABLE standup.standup_meetings (
  id SERIAL PRIMARY KEY,
  uuid uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  started_at TIME WITHOUT TIME ZONE NOT NULL,
  time_elapsed INTEGER,
  team_id INTEGER NOT NULL REFERENCES standup.teams ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX standup_standup_meetings_team_id ON standup.standup_meetings(team_id);
CREATE TRIGGER standup_standup_meetings_update
BEFORE UPDATE ON standup.standup_meetings FOR EACH ROW EXECUTE PROCEDURE standup.update_modified_column();

-- standup_meetings_times
CREATE TABLE standup.standup_meetings_times (
  id SERIAL PRIMARY KEY,
  uuid uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  time_elapsed INTEGER,
  standup_meeting_id INTEGER NOT NULL REFERENCES standup.standup_meetings ON DELETE CASCADE,
  project_id INTEGER NOT NULL REFERENCES standup.projects ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX standup_standup_meetings_times_standup_meeting_id ON standup.standup_meetings_times(standup_meeting_id);
CREATE INDEX standup_standup_meetings_times_project_id ON standup.standup_meetings_times(project_id);

-- standup_meetings_syncs
CREATE TABLE standup.standup_meetings_syncs (
  id SERIAL PRIMARY KEY,
  uuid uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  body TEXT NOT NULL,
  standup_meeting_id INTEGER NOT NULL REFERENCES standup.standup_meetings ON DELETE CASCADE,
  project_id INTEGER NOT NULL REFERENCES standup.projects ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX standup_standup_meetings_syncs_standup_meeting_id ON standup.standup_meetings_syncs(standup_meeting_id);
CREATE INDEX standup_standup_meetings_syncs_project_id ON standup.standup_meetings_syncs(project_id);

CREATE TRIGGER standup_standup_meetings_syncs_update
BEFORE UPDATE ON standup.standup_meetings_syncs FOR EACH ROW EXECUTE PROCEDURE standup.update_modified_column();
  `;
  return db.runSql(sql);
};

exports.down = function(db) {
  // YOLO
  return null;
};

exports._meta = {
  version: 1,
};
