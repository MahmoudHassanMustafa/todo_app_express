"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const jwtOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};
const jwtStrategy = new passport_jwt_1.Strategy(jwtOptions, async (payload, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: payload.id },
        });
        if (!user) {
            return done(null, { message: "Unauthorized Access" });
        }
        return done(null, user);
    }
    catch (error) {
        return done(error, false);
    }
});
exports.jwtStrategy = jwtStrategy;
//# sourceMappingURL=auth.middleware.js.map