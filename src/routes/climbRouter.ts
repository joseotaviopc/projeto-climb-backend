import { Router } from "express";
import { v4 as uuidV4 } from "uuid";
import fs from "fs";

import { UploadedFile } from "express-fileupload";
import {
  deleteClimb,
  saveImageToClimbs,
  saveNewClimb,
  searchAllClimbs,
  searchOneClimb,
  searchOneClimbById,
} from "../models/climb";

const climbRouter = Router();

type Data = {
  locals: string[];
};

// CRUD - Read


// === Tratar erros: erro no banco(500), sem conteúdo(204), ok(200) ?
climbRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  const searchById = await searchOneClimbById(id);

  if (res.statusCode === 404) {
    return res.json("Não encontrado");
  }

  res.status(200).send(searchById);
});

climbRouter.get("/:query", async (req, res) => {
  const query = req.params.query;

  const searchQuery = await searchOneClimb(query);

  if (res.statusCode === 404) {
    return res.json("Não encontrado");
  }
  res.status(200).send(searchQuery);
});

// === Tratar erros: erro no banco(500), sem conteúdo(204), ok(200) ?
climbRouter.get("/", async (req, res) => {
  const allLocals = await searchAllClimbs();

  if (res.statusCode === 404) {
    return res.json("Não encontrado");
  }

  res.status(200).send(allLocals);
});

// CRUD - Create
climbRouter.post("/", (req, res) => {
  const newLocal = { ...req.body };

  if (
    !newLocal.name ||
    !newLocal.local ||
    !newLocal.category ||
    !newLocal.graduation ||
    !newLocal.description ||
    !newLocal.conditions
  ) {
    return res
      .status(400)
      .send("Alguns dados obrigatórios não foram preenchidos.");
  }

  const { name, local, category, graduation, description, conditions } =
    req.body;

  saveNewClimb(name, local, category, graduation, description, conditions);

  res.status(201).send(newLocal);
});

// CRUD - Update
climbRouter.put("/:id", (req, res) => {
  const id = req.params.id;

  const eraseClimb = deleteClimb(id);

  res.status(201).json(eraseClimb);
});

climbRouter.post("/:id/image", (req, res) => {
  if (!req.files) {
    res.status(400).send("Arquivo não enviado");
    return;
  }

  // var imageAsBase64 = fs.readFileSync("./your-image.png", "base64");

  const fileId = uuidV4();
  const projectPath = `C:/Users/carva/Documents/Degree/modulo-11/aula-01`;
  const sampleFile = req.files.thumbnail as UploadedFile;
  const uploadPath = `${projectPath}/images/climbs/${fileId}`;

  sampleFile.mv(uploadPath, (err: Error) => {
    if (err) {
      console.log(err);
      res.status(500).send("deu erro");
      return;
    }

    saveImageToClimbs(req.params.id, uploadPath);
    res.status(201).send("Imagem enviada");
  });
})

// CRUD - Delete (deletar images)
climbRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const climb = await searchOneClimbById(id);
  
  // if (climb && climb.photo_url) {

  // }

  const eraseClimb = deleteClimb(id);
  if (res.statusCode === 404) {
    return res.json("Não encontrado");
  }
  res.status(200).json(eraseClimb);
});

export default climbRouter;
