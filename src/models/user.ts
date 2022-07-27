import { model, Schema } from "mongoose";

interface TClimber {
  email: string;
  password: string;
  name: string;
  lastName: string;
}

const climberSchema = new Schema<TClimber>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
});

const ClimberModel = model<TClimber>("Climber", climberSchema);

export const searchAllClimbers = async () => {
  try {
    await ClimberModel.find();
  } catch (error) {
    console.log("Erro:", error);
    return error;
  }
};

export const searchOneClimber = async (email: string) => {
  try {
    await ClimberModel.find({
      email: email,
    });
  } catch (error) {
    console.log("Erro ao encontrar climber:", error);
    return error;
  }
};

export const createNewClimber = async (
  email: string,
  password: string,
  name: string,
  lastName: string
) => {
  const climber = await getClimberByEmail(email);
  if (climber) {
    throw new Error("Climber já existe");
  }

  const newClimber = new ClimberModel({ email, password, name, lastName });

  try {
    await newClimber.save();
    console.log("Climber criado com sucesso!");
    return newClimber;
  } catch (error) {
    console.log("Erro ao criar climber:", error);
    return error;
  }
};

export const getClimberByEmail = async (email: string) => {
  const climber = await ClimberModel.find({
    email: email,
  });

  return climber;
  // retorna o user, verifica fora
};

export const updateClimber = async (email: string) => {
  try {
    await ClimberModel.updateOne({
      email,
    });
  } catch (error) {
    console.log("Erro ao atualizar climber:", error);
    return error;
  }
};

export const deleteClimber = async (email: string) => {
  try {
    await ClimberModel.findOne({
      email,
    });
  } catch (error) {
    console.log("Erro ao deletar climber:", error);
    return error;
  }
};
