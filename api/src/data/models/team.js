export default (sequelize, DataTypes) => {
  const Team = sequelize.define(
    'Team',
    {
      uuid: {type: DataTypes.STRING, field: 'uuid'},
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      currentFacilitatorIdx: {
        type: DataTypes.INTEGER,
        field: 'current_facilitator_idx',
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      schema: 'v1',
      tableName: 'teams',
      timestamps: true,
    },
  );

  Team.associate = models => {
    const {Facilitator, TeamSettings} = models;

    Team.Facilitators = Team.hasMany(Facilitator, {
      foreignKey: 'team_id',
      as: 'facilitators',
    });

    Team.TeamSettings = Team.hasOne(TeamSettings, {
      foreignKey: 'team_id',
      as: 'teamSettings',
    });
  };

  return Team;
};
