export default (sequelize, DataTypes) => {
  const Standup = sequelize.define(
    'Standup',
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
      runDate: {
        type: DataTypes.DATE,
        field: 'run_date',
        allowNull: false,
      },
    },
    {
      schema: 'v1',
      tableName: 'standups',
      timestamps: true,
    },
  );

  Standup.associate = models => {
    const {Facilitator, Team} = models;

    Standup.Facilitator = Standup.belongsTo(Facilitator, {
      foreignKey: 'facilitator_id',
      as: 'faciliator',
    });

    Standup.Team = Standup.belongsTo(Team, {
      foreignKey: 'team_id',
      as: 'team',
    });
  };

  return Standup;
};
