import db from 'src/data';

export default {
  facilitator(standup, _args, _context) {
    return db.Facilitator.findOne({
      where: { id: standup.facilitator_id }
    });
  },
  team(standup, _args, _context) {
    return db.Team.findOne({
      where: { id: standup.team_id }
    });
  },
};
