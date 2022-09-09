import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@graphql/eden";
import { render, RenderOptions } from "@testing-library/react";
import React, { FC, ReactElement } from "react";

const AllProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
