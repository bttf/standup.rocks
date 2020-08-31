import db from 'src/data';

async function deleteFacilitatorMutation(_, args, context) {
  const { uuid } = args;
  
  if (!uuid) {
    return { errors: ['Facilitator UUID must be specified'] };
  }

  const facilitator = await db.Facilitator.destroy({
    where: { uuid },
    returning: true
  });

  return { deletedFacilitator: facilitator };
}

export default deleteFacilitatorMutation;
