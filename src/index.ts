import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloWorldResolver } from "./resolvers/HelloWorldResolver";

(async () => {
  const app = express();

  const options = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );
  console.log( "options"+ JSON.stringify(options))
  await createConnection({ ...options});
    console.log( "options"+ JSON.stringify(options))
  const apolloServer = new ApolloServer({
    schema:  await buildSchema({
      resolvers: [HelloWorldResolver],
      validate: true
    }),
    context: ({ req, res }) => ({ req, res })
  });
  console.log("server is "+ apolloServer)
  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 4000;
  console.log("port is "+ port)
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
