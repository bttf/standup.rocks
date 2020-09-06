import db from 'src/data';
import {io} from '../../../index';

export default async function bumpCurrentFacilitatorIndex(_, args, context) {
  const {teamUuid: uuid} = args;

  if (!uuid) {
    return {errors: ['Team UUID must be specified']};
  }

  const team = await db.Team.findOne({where: {uuid}});

  if (!team) {
    return {errors: ['Team not found']};
  }

  await team.update({currentFacilitatorIdx: team.currentFacilitatorIdx + 1});

  io.emit(`${team.code}_facilitators_bumped`);

  return {team};
}
