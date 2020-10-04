import db from 'src/data';

export default {
  facilitator(standup, _args, _context) {
    return db.Facilitator.findOne({
      where: {id: standup.facilitator_id},
    });
  },
  async upNext(standup) {
    const facilitators = await db.Facilitator.findAll({
      where: {team_id: standup.team_id},
      order: [['idx', 'asc']],
    });
    const facilitatorIds = facilitators.map(f => f.id);
    const indexOfCurrFacilitator = facilitatorIds.indexOf(
      standup.facilitator_id,
    );
    const upNextIndex = (indexOfCurrFacilitator + 1) % facilitatorIds.length;
    return facilitators[upNextIndex];
  },
  team(standup, _args, _context) {
    return db.Team.findOne({
      where: {id: standup.team_id},
    });
  },
  actionItems(standup) {
    return db.ActionItem.findAll({
      where: {standup_id: standup.id},
      order: [['id', 'asc']],
    });
  },
};
