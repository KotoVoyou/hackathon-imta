import { app as restApp, AppConfig } from "./app";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { typeDefs } from "./database/graphql/schema";
import { resolvers } from "./database/graphql/resolvers";
import { connect as connectDatabase } from "./database";

const PORT = process.env.PORT || 3000;

connectDatabase();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
});
server
    .start()
    .then(() => {
        console.log(process.env.NODE_ENV);
        const config: AppConfig = {
            staticDirectory: `${__dirname}/${
                process.env.STATIC_DIR || "../dist/build"
            }`,
        };

        const app = restApp(config);
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
