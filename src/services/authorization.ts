import { getValidToken } from "../models/token";

export const getClimberByTokenId = async (tokenId: string) => {
  // pegar token
  const token = await getValidToken(tokenId);
  // pegar user do token
  // const user = await getClimbererById
}