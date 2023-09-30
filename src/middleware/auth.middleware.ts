import { Strategy, ExtractJwt, VerifiedCallback } from "passport-jwt";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new Strategy(
  jwtOptions,
  async (payload, done: VerifiedCallback): Promise<void> => {
    try {
      const user: User | null = await prisma.user.findUnique({
        where: { id: payload.id },
      });

      if (!user) {
        return done(null, { message: "Unauthorized Access" });
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
);

export { jwtStrategy };
