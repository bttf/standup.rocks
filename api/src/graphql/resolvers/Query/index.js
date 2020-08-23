import db from 'src/data';

export default {
  findTeam(_, args, context) {
    const { code } = args;

    if (!code) return null;

    return db.Team.findOne({
      where: {
        code,
      }
    });
  },
};
