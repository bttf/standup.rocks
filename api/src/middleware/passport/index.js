import passport from 'passport';
import bearerStrategy from './bearerStrategy';

passport.use(bearerStrategy);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

export default passport;
