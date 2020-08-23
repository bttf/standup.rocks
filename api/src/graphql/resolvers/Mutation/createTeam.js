import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from 'src/data';

const ID_LEN = 6;

async function _genPasswordDigest(password) {
  return new Promise((resolve, reject) => bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  }));
}

async function createTeamMutation(_, args, context) {
  const {
    name,
    password
  } = args;

  const existingTeam = await db.Team.findOne({
    where: {
      name
    }
  });

  if (existingTeam) {
    return { errors: ['Team name has been taken'] };
  }

  // generate code
  const code = nanoid(ID_LEN);

  // create team
  const team = await db.Team.create({
    name,
    code,
  });

  // create team settings
  // - if password exists, generate password digest and persist
  const passwordDigest = password ? await _genPasswordDigest(password) : undefined;

  await db.TeamSettings.create({
    password: passwordDigest,
    team_id: team.id,
  });

  // return created team
  return { createdTeam: team };
}

export default createTeamMutation;
