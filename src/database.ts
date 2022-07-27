import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = String(process.env.MONGO_URL);

const connect = async (tries = 1) => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Conectado ao banco");
  } catch (e) {
    console.error("Sem conexão com o banco", e);
    setTimeout(() => connect(tries + 1), 3000 ** tries);
    // "Backoff" tenta várias vezes se conectar
  }
};

connect();

// Definindo um modelo Cat em forma de objeto
// const Cat = mongoose.model("Cat", { name: String });

// cria uma instância do modelo Cat
// const kitty = new Cat({ name: "Zildjian" });

// salva a instancia e faz um console
// kitty.save().then(() => console.log("meow"));
