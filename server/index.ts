import app from "./app";

Bun.serve({
  fetch: app.fetch,
});

console.log("server running");
