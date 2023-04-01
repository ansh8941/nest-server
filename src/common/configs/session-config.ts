import { ISessionOption } from '@common/environment/environment.interface';

export const sessionConfig = (sessionEnv: ISessionOption) => {
  return {
    secret: sessionEnv.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 30, // 60 days --> need >= max of alive time of refresh token
    },
  };
};
