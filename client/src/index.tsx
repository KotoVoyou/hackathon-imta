import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./catalogue/UETable";

import DynamicApp from "./App";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const apolloServerUri =
    process.env.APOLLO_SERVER_URI ||
    "https://hackathon-imta.osc-fr1.scalingo.io/graphql";
console.log(apolloServerUri);
const apolloClient = new ApolloClient({
    uri: apolloServerUri,
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={apolloClient}>
            <DynamicApp />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
