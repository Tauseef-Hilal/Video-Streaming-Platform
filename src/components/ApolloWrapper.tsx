"use client";

import { useMemo } from "react";
import { ApolloProvider } from "@apollo/client";

import getApolloClient from "@/lib/graphql/client/client";

interface ApolloWrapperProps {
  children: React.ReactNode;
}

const ApolloWrapper: React.FC<ApolloWrapperProps> = ({ children }) => {
  const client = useMemo(getApolloClient, []);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
