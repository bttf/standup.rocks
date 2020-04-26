export default (sequelize, DataTypes) => {
  const GoogleAuth = sequelize.define(
    'GoogleAuth',
    {
      entityId: {type: DataTypes.STRING, field: 'entity_id'},
      accessToken: {type: DataTypes.STRING, field: 'access_token'},
      refreshToken: {type: DataTypes.STRING, field: 'refresh_token'},
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
      userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        unique: true,
      },
    },
    {
      schema: 'standup',
      tableName: 'google_auths',
    },
  );

  GoogleAuth.associate = models => {
    const {User} = models;

    GoogleAuth.User = GoogleAuth.belongsTo(User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return GoogleAuth;
};
