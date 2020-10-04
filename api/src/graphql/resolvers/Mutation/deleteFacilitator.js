import db from 'src/data';

async function deleteFacilitatorMutation(_, args, context) {
  const {uuid} = args;

  if (!uuid) {
    return {errors: ['Facilitator UUID must be specified']};
  }

  const facilitator = await db.Facilitator.findOne({
    where: {uuid},
  });

  // Set null on standups
  await db.Standup.update(
    {
      facilitator_id: null,
    },
    {
      where: {
        facilitator_id: facilitator.id,
      },
    },
  );

  await facilitator.destroy();

  // redo indexes so there are no gaps
  const teamFacilitators = await db.Facilitator.findAll({
    where: {
      team_id: facilitator.team_id,
    },
    order: [['idx', 'asc']],
  });

  await Promise.all(
    teamFacilitators.map((f, idx) => {
      return f.update({idx});
    }),
  );

  return {deletedFacilitator: facilitator};
}

export default deleteFacilitatorMutation;
