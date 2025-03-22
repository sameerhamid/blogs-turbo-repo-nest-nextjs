import { BACKEND_URL } from "./constants";
import { getSession } from "./session";

export const fetchGraphql = async (query: string, variables = {}) => {
  const res = await fetch(`${BACKEND_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  const result = await res.json();

  console.log("GraphQL result:", result);

  if (result.errors) {
    // console.error("GraphQL error:", result.errors);
    return {
      errors: result.errors,
    };
    // throw new Error("Failed to fetch data from GraphQL");
  }

  return result.data;
};

export const authFetchGraphql = async (query: string, variables = {}) => {
  const session = await getSession();
  console.log("session>>>", session);
  const res = await fetch(`${BACKEND_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  const result = await res.json();

  console.log("GraphQL result:", result);

  if (result.errors) {
    // console.error("GraphQL error:", result.errors);
    return {
      errors: result.errors,
    };
    // throw new Error("Failed to fetch data from GraphQL");
  }

  return result.data;
};
