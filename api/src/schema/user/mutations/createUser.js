import { GraphQLNonNull, GraphQLString } from 'graphql';
import bcrypt from 'bcrypt';
// import sgMail from '@sendgrid/mail';
import db from '../../../db';
import UserType from '../';

export default {
  name: 'createUser',
  type: UserType,
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, args) => {
    const { username, email, password } = args;

    const userAuth = await new Promise(resolve =>
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          const userAuth = await db.UserAuth.create({ passwordHash: hash });
          resolve(userAuth);
        });
      }),
    );

    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // const msg = {
    //   to: 'adnanchowdhury88@gmail.com',
    //   from: 'wiz@devforu.ms',
    //   templateId: 'd-932c75c94e404dd889f86d3b07b54c73',
    // };

    // sgMail.send(msg);

    const user = await db.User.create({
      username,
      email,
      password,
    });

    await userAuth.update({ userID: user.id });

    return user;
  },
};
