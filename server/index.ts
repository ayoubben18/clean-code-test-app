import app from "./app";

Bun.serve({
  fetch: app.fetch,
});

console.log("server running");
// console.log({
//   url: process.env.TURSO_CONNECTION_URL!,
//   authToken: process.env.TURSO_AUTH_TOKEN!,
// });
