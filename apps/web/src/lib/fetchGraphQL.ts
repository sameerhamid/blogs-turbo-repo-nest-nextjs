import { BACKEND_URL } from "./constants";

export const fetchGraphql = async (query: string, variables = {}) => {
  const res = await fetch(`${BACKEND_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  const result = await res.json();

  if (result.errors) {
    console.error("GraphQL error:", result.errors);
    throw new Error("Failed to fetch data from GraphQL");
  }

  return result.data;
};
