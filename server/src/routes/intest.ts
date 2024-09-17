import { Elysia } from "elysia";

export const intestRoutes = (app: Elysia) => {
  app.get("/intest", (ctx) => {
    // console.log(ctx);
    return "intest";
  });
};
