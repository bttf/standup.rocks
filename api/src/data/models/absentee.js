export default (sequelize, DataTypes) => {
  const Absentee = sequelize.define(
    'Absentee',
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
    },
    {
      schema: 'v1',
      tableName: 'absentees',
      timestamps: true,
    },
  );

  Absentee.associate = models => {
    const {Facilitator, Team} = models;

    Absentee.Facilitator = Absentee.belongsTo(Facilitator, {
      foreignKey: 'facilitator_id',
      as: 'facilitator',
    });

    Absentee.Team = Absentee.belongsTo(Team, {
      foreignKey: 'team_id',
      as: 'team',
    });
  };

  return Absentee;
};
