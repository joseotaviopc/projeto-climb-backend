import { getValidToken } from "../models/token";

const authenticationMiddleware = async (
  req: any,
  res: any,
  next: () => void
) => {
  const tokenId = req.headers["Authorization"];

  try {
    await getValidToken(tokenId);
  } catch (e) {
    res.status(403).send("Não autorizado");
    return;
  }

  next();
};

export default authenticationMiddleware;
