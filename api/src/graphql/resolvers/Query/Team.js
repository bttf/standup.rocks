import db from 'src/data';

export default {
  facilitators(team, _args, _context) {
    return db.Faciliator.findAll({
      where: {
        team_id: team.id
      }
    });
  },
  absentees(team, _args, _context) {
    return db.Absentee.findAll({
      where: {
        team_id: team.id
      }
    });
  },
  standupOnDate(team, args, _context) {
    const { date } = args;
    return db.Standup.findOne({
      where: {
        runDate: date,
      },
    });
  },
  standups(team, _args, _context) {
    return db.Standup.findAll({
      where: {
        team_id: team.id
      },
      order: [['runDate', 'DESC']],
    });
  },
};
