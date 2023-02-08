import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import User from "../models/User";

passport.use(
    new Strategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_KEY,
            jsonWebTokenOptions: {
                complete: false,
                ignoreExpiration: false,
                maxAge: "2d",
            },
        },
        async (payload, done) => {
            try {
                const user = await User.findById(payload.sub);

                if (!user) {
                    return done(null, false);
                }

                return done(null, user);
            } catch (err) {
                done(err, false);
            }
        },
    ),
);
