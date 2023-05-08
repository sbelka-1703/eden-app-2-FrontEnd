import { authMiddleware } from "@clerk/nextjs";

const params = { publicRoutes: ["/"] };

export default authMiddleware(params);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};
