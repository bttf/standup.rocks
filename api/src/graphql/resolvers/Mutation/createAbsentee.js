import db from 'src/data';

async function createAbsenteeMutation(_, args, context) {
  const { facilitatorUuid } = args;

  if (!facilitatorUuid) {
    return { errors: ['Facilitator must be specified'] };
  }

  const facilitator = await db.Facilitator.findOne({
    where: { uuid: facilitatorUuid }
  });

  if (!facilitator) {
    return { errors: ['Facilitator not found'] };
  }

  const absentee = await db.Absentee.create({
    team_id: facilitator.team_id,
    facilitator_id: facilitator.id,
  });

  // bump curr idx on team
  const team = await db.Team.findOne({
    where: { id: facilitator.team_id },
    include: [{
      association: db.Team.Facilitators
    }],
  });

  await db.Team.update({
    currentFacilitatorIdx: (team.currentFacilitatorIdx + 1) % team.facilitators.length,
  }, {
    where: { team_id: facilitator.team_id }
  });

  return { createdAbsentee: absentee };
}

export default createAbsenteeMutation;
