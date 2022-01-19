import { app as restApp, AppConfig } from "./app";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { typeDefs } from "./database/graphql/schema";
import { resolvers } from "./database/graphql/resolvers";
import { connect as connectDatabase } from "./database";

const PORT = process.env.PORT || 3001;

connectDatabase();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
    introspection: true,
});
server
    .start()
    .then(() => {
        const config: AppConfig = {
            staticDirectory: `${process.cwd()}/${process.env.STATIC_DIR || "dist/webapp"}`,
        };

        const app = restApp(config);
        server.applyMiddleware({ app });

        app.listen({ port: PORT }, () => {
            console.log(`Server is running at http://localhost:${PORT}${server.graphqlPath}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
