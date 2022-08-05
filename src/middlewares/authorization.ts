import { getClimberByTokenId } from "../services/authorization";

const basicPaths = ["products", "cart", "list"];

const authorizationMiddleware = async (
  req: any,
  res: any,
  next: () => void
) => {
  const tokenId = req.headers["Authorization"];

  const user = await getClimberByTokenId(tokenId);

  // switch (user?.role) {
  //   case "basic":
  //     if (!basicPaths.find(req.path)) {
  //       res.status(403).send("Unauthorized");
  //       return;
  //     }
  // }

  next();
};

export default authorizationMiddleware;
