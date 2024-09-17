import { Elysia } from "elysia";
import testRoutes from "./test";

const routes = new Elysia({prefix: "/api"});
routes.use(testRoutes);
export default routes;
