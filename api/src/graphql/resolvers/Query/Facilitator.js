import db from 'src/data';

export default {
  index(facilitator, _args, _context) {
    return facilitator.idx;
  },
  team(facilitator, _args, _context) {
    return db.Team.findOne({
      where: { id: facilitator.team_id }
    });
  },
};
