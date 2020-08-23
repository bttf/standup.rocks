import { keyBy } from 'lodash';
import db from 'src/data';

async function setFacilitatorOrder(_, args, context) {
  const { uuids } = args;

  if (!uuids || !uuids.length) {
    return { errors: ['List must be specified'] };
  }

  const facilitators = await db.Facilitator.findAll({
    where: { uuid: uuids }
  });

  if (!facilitators || !facilitators.length) {
    return { errors: ['Facilitators not found'] };
  }

  const facilitatorsByUuid = keyBy(facilitators, 'uuid');

  const newFacilitators = uuids.map((uuid, idx) => (
    {
      ...(facilitatorsByUuid[uuid].toJSON()),
      idx,
    }
  ));

  await db.Facilitator.destroy({
    where: { uuid: uuids }
  });

  // delete all absentees
  await db.Absentee.destroy({
    where: { team_id: newFacilitators[0].team_id }
  });

  // reset curr idx on team
  await db.Team.update({ currentFacilitatorIdx: 0 }, {
    where: { team_id: newFacilitators[0].team_id }
  });

  const createdFacilitators =  await db.Facilitator.bulkCreate(newFacilitators);

  return { facilitators: createdFacilitators };
}

export default setFacilitatorOrder;
