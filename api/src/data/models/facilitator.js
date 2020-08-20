export default (sequelize, DataTypes) => {
  const Facilitator = sequelize.define(
    'Facilitator',
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
      idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      schema: 'v1',
      tableName: 'facilitators',
      timestamps: true,
    },
  );

  Facilitator.associate = models => {
    const {Absentee, Team} = models;

    Facilitator.Absentee = Facilitator.hasOne(Absentee, {
      foreignKey: 'facilitator_id',
      as: 'absentee',
    });

    Facilitator.Team = Facilitator.belongsTo(Team, {
      foreignKey: 'team_id',
      as: 'team',
    });
  };

  return Facilitator;
};
