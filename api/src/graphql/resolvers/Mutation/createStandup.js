import db from 'src/data';
import {io} from '../../../index';

async function createStandupMutation(_, args, context) {
  const {date, facilitatorUuid} = args;

  if (!date) {
    return {errors: ['Date must be specified']};
  }

  if (!facilitatorUuid) {
    return {errors: ['Facilitator must be specified']};
  }

  const facilitator = await db.Facilitator.findOne({
    where: {uuid: facilitatorUuid},
  });

  if (!facilitator) {
    return {errors: ['Facilitator not found']};
  }

  const standup = await db.Standup.create({
    runDate: date,
    team_id: facilitator.team_id,
    facilitator_id: facilitator.id,
  });

  // bump curr idx on team
  const team = await db.Team.findOne({
    where: {id: facilitator.team_id},
    include: [
      {
        association: db.Team.Facilitators,
      },
    ],
  });

  await db.Team.update(
    {
      currentFacilitatorIdx:
        (team.currentFacilitatorIdx + 1) % team.facilitators.length,
    },
    {
      where: {id: facilitator.team_id},
    },
  );

  io.emit(`${team.code}_standup_created`);

  return {createdStandup: standup};
}

export default createStandupMutation;
