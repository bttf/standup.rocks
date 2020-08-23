import db from 'src/data';

async function createFacilitatorMutation(_, args, context) {
  const { name, teamUuid } = args;
  
  if (!name) {
    return { errors: ['Name must be specified'] };
  }

  if (!teamUuid) {
    return { errors: ['Team must be specified'] };
  }

  const team = await db.Team.findOne({
    where: { uuid: teamUuid }
  });

  if (!team) {
    return { errors: ['Team not found'] };
  }

  const existingFacilitators = await db.Facilitator.findAll({
    where: { team_id: team.id },
    order: [['idx', 'desc']],
  });

  const newIndex = existingFacilitators && existingFacilitators.length ? existingFacilitators[0].idx + 1 : 0;

  const facilitator = await db.Facilitator.create({
    name,
    idx: newIndex,
    team_id: team.id,
  });

  return { createdFacilitator: facilitator };
}

export default createFacilitatorMutation;
