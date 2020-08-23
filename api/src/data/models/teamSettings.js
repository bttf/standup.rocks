export default (sequelize, DataTypes) => {
  const TeamSettings = sequelize.define(
    'TeamSettings',
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
      password: {
        type: DataTypes.STRING,
      },
      links: {
        type: DataTypes.JSON,
      },
    },
    {
      schema: 'v1',
      tableName: 'team_settings',
      timestamps: true,
    },
  );

  TeamSettings.associate = models => {
    const {Team} = models;
    TeamSettings.Team = TeamSettings.belongsTo(Team, {
      foreignKey: 'team_id',
      as: 'team',
    });
  };

  return TeamSettings;
};
