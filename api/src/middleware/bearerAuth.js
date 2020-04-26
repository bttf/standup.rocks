import { genGoogleOAuthClient } from '../lib/auth';
import passport from '../middleware/passport';
import db from '../db';

export default (req, res, next) => {
  const unauthorizedResponse = () => {
    res.status(401).json({ errors: [{ message: 'Unauthorized' }] });
  };

  passport.authenticate('bearer', async (err, decodedUser) => {
    if (err || !decodedUser) return unauthorizedResponse();

    const user = await db.User.findByEntityId(decodedUser.entityId, {
      include: { association: db.User.GoogleAuth },
    });

    if (!user) return unauthorizedResponse();

    const googleOAuthClient = await genGoogleOAuthClient(user);

    req.user = user.toJSON();
    req.googleAuth = googleOAuthClient;

    next();
  })(req, res, next);
};
