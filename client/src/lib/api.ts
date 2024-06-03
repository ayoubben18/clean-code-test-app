import { type ApiRoutes } from "@server/app";
import { queryOptions } from "@tanstack/react-query";
import { hc } from "hono/client";

const client = hc<ApiRoutes>("/");

export const api = client.api;
async function getCurrentUser() {
  const response = await api.me.$get();
  if (!response.ok) {
    throw new Error("Server Error");
  }
  const body = await response.json();
  return body;
}

export const userQueryOptions = queryOptions({
  queryKey: ["user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});
