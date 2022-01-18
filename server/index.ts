import { app } from "./app";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./database/graphql/schema";
import { resolvers } from "./database/graphql/resolvers";
import { connect as connectDatabase } from "./database";

const PORT = process.env.PORT || 3000;

connectDatabase();

const server = new ApolloServer({ typeDefs, resolvers });
server
    .start()
    .then(() => {
        server.applyMiddleware({ app });

        app.listen({ port: PORT }, () => {
            console.log(
                `Server is running at http://localhost:${PORT}${server.graphqlPath}`
            );
        });
    })
    .catch((error) => {
        console.log(error);
    });
