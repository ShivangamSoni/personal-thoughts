import session from "express-session";

export const sessionMiddleware = session({
    secret: process.env.SESSION_KEY!,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 Day
    },
});
