import { Application } from "./depts.ts";

const app = new Application();
// listeners
app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${hostname ??
      "localhost"}:${port}`,
  );
});

// Logger
app.use(async (ctx, next) => {
  await next();

  const rt = ctx.response.headers.get("X-Response-Time");

  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

app.use((ctx) => {
  ctx.response.body = "OK";
});

await app.listen({ port: 8000 });
