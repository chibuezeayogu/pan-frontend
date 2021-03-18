import { ApolloProvider } from "@apollo/client";
import * as React from "react";
import {render } from "react-dom";
import PorductList from "./components/products/ProductList";
import client from "./graphQL/index";
import "./assests/scss/main.scss";

const ROOT = document.getElementById('root');

const App = () => (
  <ApolloProvider client={client}>
    <PorductList />
  </ApolloProvider>
)
 render(<App />, ROOT);
