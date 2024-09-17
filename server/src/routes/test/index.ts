import { Elysia, ElysiaConfig } from "elysia";

const testRoutes = new Elysia({ prefix: "/test" });

testRoutes.get("/", () => "<h1>Hello</h1>");

export default testRoutes;
