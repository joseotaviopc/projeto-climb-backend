import { model, Schema } from "mongoose";
import moment from "moment";

export interface TToken {
  createdAt?: Date;
  active?: boolean;
  userId: string;
}

const tokenSchema = new Schema<TToken>({
  createdAt: Date,
  active: Boolean,
  userId: { type: String, required: true },
});

const tokenModel = model<TToken>("Token", tokenSchema);

export const createToken = async (
  createdAt: Date,
  active: boolean,
  userId: string
) => {
  const token = new tokenModel({ userId, createdAt, active });

  //   token.createdAt = new Date();
  //   token.active = true;
  //   token.userId = userId;

  await token.save();
  return token;
};

export const getValidToken = async (tokenId: string) => {
  const token = await tokenModel.findById(tokenId);
  // pode buscar por ID e ativo ou prazo de expiração

  if (!token) throw new Error("Token inválido");

  if (!token.active) throw new Error("Token inválido");

  const expireAt = moment(token.createdAt);
  expireAt.add(3, "d");

  if (expireAt < moment()) throw new Error("Token inválido");

  return token;
};
