import { MyContext } from "src/types";
import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { COOKIE_NAME, __prod__ } from "./constants";
import express from "express";
import microConfig from "./mikro-orm.config";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { UserResolver } from "./resolvers/user";
import { PostResolver } from "./resolvers/post";
import { HelloResolver } from "./resolvers/hello";

import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";

import cors from "cors";
import { sendEmail } from "./utils/sendEmail";
import { User } from "./entities/User";
const main = async () => {
   const orm = await MikroORM.init(microConfig);

   await orm.getMigrator().up();

   const app = express();
   const RedisStore = connectRedis(session);
   app.use(
      cors({
         origin: "http://localhost:3000",
         credentials: true,
      })
   );
   const redisClient = redis.createClient();

   app.use(
      session({
         name: COOKIE_NAME,
         store: new RedisStore({
            client: redisClient,
            disableTouch: true,
         }),
         cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: __prod__,
         },
         saveUninitialized: false,
         secret: "dloqwldqwplkdpqwld",
         resave: false,
      })
   );

   const apolloServer = new ApolloServer({
      schema: await buildSchema({
         resolvers: [HelloResolver, PostResolver, UserResolver],
         validate: false,
      }),
      context: ({ req, res }): MyContext => ({
         em: orm.em,
         req,
         res,
      }),
   });

   apolloServer.applyMiddleware({
      app,
      cors: false,
   });

   app.listen(4000, () => {
      console.log("server running on port 4000");
   });
};

main().catch((err) => {
   console.log(err);
});
