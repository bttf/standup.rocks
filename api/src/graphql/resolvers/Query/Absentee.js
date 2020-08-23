import db from 'src/data';

export default {
  absentAt(absentee, _args, _context) {
    return absentee.createdAt;
  },
  facilitator(absentee, _args, _context) {
    return db.Facilitator.findOne({
      where: { id: absentee.facilitator_id }
    });
  },
  team(absentee, _args, _context) {
    return db.Team.findOne({
      where: { id: absentee.team_id }
    });
  },
};
