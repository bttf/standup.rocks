export default (sequelize, DataTypes) => {
  const ActionItem = sequelize.define(
    'ActionItem',
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
      text: {
        type: DataTypes.STRING,
      },
    },
    {
      schema: 'v1',
      tableName: 'action_items',
      timestamps: true,
    },
  );

  ActionItem.associate = models => {
    const {Standup} = models;

    ActionItem.Standup = ActionItem.belongsTo(Standup, {
      foreignKey: 'standup_id',
      as: 'standup',
    });
  };

  return ActionItem;
};
