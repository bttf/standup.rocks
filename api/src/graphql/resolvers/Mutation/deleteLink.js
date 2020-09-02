import db from 'src/data';

export default async function addLink(_, args) {
  const { name, teamUuid: uuid } = args;

  const team = await db.Team.findOne({
    where: { uuid },
    include: [{
      association: db.Team.TeamSettings
    }],
  });

  if (!team) {
    return { errors: ['Team not found'] };
  }

  if (!team.teamSettings) {
    return { errors: ['Team settings not found'] };
  }

  await db.TeamSettings.update({
    links: {
      ...team.teamSettings.links,
      [name]: undefined,
    }
  }, {
    where: {
      id: team.teamSettings.id
    }
  });

  return {
    deletedLink: {
      [name]: null
    },
  };
}
