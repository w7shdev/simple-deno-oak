import { Router } from "../depts.ts";
import { createJWT } from "./util/jwt.ts";
const router = new Router();

router.post("/auth", (ctx) => {
  ctx.response.body = {
    message: "APP running",
    data: {},
  };
}).get("/auth/me", async (ctx) => {
  const accessToken = await createJWT({
    user: "admin",
    id: "someid",
  });
  ctx.response.body = {
    message: "Success",
    data: {
      access_token: accessToken,
    },
  };
});

export { router };
