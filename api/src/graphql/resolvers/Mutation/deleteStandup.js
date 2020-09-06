import db from 'src/data';
import {io} from '../../../index';

export default async (_, {teamUuid, date}) => {
  const team = await db.Team.findOne({
    where: {uuid: teamUuid},
  });

  if (!team) {
    return {errors: ['Team not found']};
  }

  const standup = await db.Standup.findOne({
    where: {
      runDate: date,
      team_id: team.id,
    },
  });

  if (!standup) {
    return {errors: ['Standup not found']};
  }

  await standup.destroy();

  io.emit(`${team.code}_standup_deleted`);

  return {deletedStandup: standup};
};
