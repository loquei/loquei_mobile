import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function UseAuthRoutes() {
  return {
    AuthRoutes,
    AppRoutes,
  }
}