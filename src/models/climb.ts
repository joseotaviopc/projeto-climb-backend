import { model, ObjectId, Schema } from "mongoose";

type Category = "Boulder" | "Esportiva" | "Parede" | "Psicobloc" | "Ginásio";

interface TClimbModel {
  _id: ObjectId;
  name: string;
  local: string;
  category: Category;
  graduation: string;
  description: string;
  conditions: string;
  video_url: string[];
  photo_url: string[];
  croqui_url: string[];
  location?: {
    long: Number;
    lat: Number;
  };
}

const climbSchema = new Schema<TClimbModel>({
  name: { type: String, required: true },
  local: { type: String, required: true },
  category: { type: String, required: true },
  graduation: { type: String, required: true },
  description: { type: String, required: true },
  conditions: { type: String, required: true },
  video_url: [String],
  photo_url: [String],
  croqui_url: [String],
  location: {
    long: Number,
    lat: Number,
  },
});

const ClimbModel = model<TClimbModel>("LocalClimb", climbSchema);

export const searchOneClimbById = async (id: string): Promise<TClimbModel | null | Error> => {
  try {
    const resp = await ClimbModel.findById({
      _id: id,
    });

    console.log("Local encontrado com sucesso");
    return resp;
  } catch (error) {
    console.log("Erro:", error);
    return error as Error;
  }
};

export const searchOneClimb = async (name: string) => {
  try {
    const resp = await ClimbModel.findOne({
      name: name,
    });

    console.log("Local encontrado com sucesso", resp);
    return resp;
  } catch (error) {
    console.log("Erro:", error);
    return error;
  }
};

export const searchAllClimbs = async () => {
  // await ClimbModel.find();
  try {
    const resp = await ClimbModel.find();
    console.log("Locais encontrados");
    return resp;
  } catch (error) {
    console.log("Erro:", error);
    return error;
  }
};

export const saveNewClimb = async (
  name: string,
  local: string,
  category: string,
  graduation: string,
  description: string,
  conditions: string
) => {
  const newClimbModel = new ClimbModel({
    name,
    local,
    category,
    graduation,
    description,
    conditions,
  });

  try {
    await newClimbModel.save();
    console.log("Salvo com sucesso");
  } catch (error) {
    console.log("Erro:", error);
    return error;
  }
};

export const deleteClimb = async (id: string) => {
  try {
    await ClimbModel.findByIdAndDelete({
      _id: id,
    });
    console.log("Local deletado");
  } catch (error) {
    console.log("Erro:", error);
    return error;
  }
};

export const updateClimb = async (local: string) => {
  try {
    await ClimbModel.updateOne({
      local,
    });
    console.log("Local atualizado");
  } catch (error) {
    console.log("Erro:", error);
    return error;
  }
};

export const saveImageToClimbs = async (id: string, path: string) => {
  try {
    const climb = await ClimbModel.findById(id);

    if (climb) {
      climb.photo_url.push(path);
      return await climb.save();
    }
    console.log("Id não encontrado");
    
  } catch (error) {
    console.log("Erro:", error);
    return error;
  }

    


};
// envia via From ou Form-encoded, no thunder Client (file)
