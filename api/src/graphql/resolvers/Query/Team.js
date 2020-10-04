import db from 'src/data';
import {keyBy, range} from 'lodash';

export default {
  async facilitators(team, _args, _context) {
    const currIdx = team.currentFacilitatorIdx;
    const facilitators = await db.Facilitator.findAll({
      where: {
        team_id: team.id,
      },
    });

    if (!facilitators || !facilitators.length) return [];

    const facilitatorsByIndex = keyBy(facilitators, 'idx');

    return range(facilitators.length)
      .map(i => (i + currIdx) % facilitators.length)
      .map(i => facilitatorsByIndex[parseInt(i, 10)]);
  },
  absentees(team, _args, _context) {
    return db.Absentee.findAll({
      where: {
        team_id: team.id,
      },
      order: [['createdAt', 'asc']],
    });
  },
  standupOnDate(team, args, _context) {
    const {date} = args;
    return db.Standup.findOne({
      where: {
        runDate: date,
        team_id: team.id,
      },
    });
  },
  standups(team, _args, _context) {
    return db.Standup.findAll({
      where: {
        team_id: team.id,
      },
      order: [['runDate', 'DESC']],
    });
  },
  settings(team) {
    return db.TeamSettings.findOne({
      where: {team_id: team.id},
    });
  },
};
