const express = require("express");
const notesModel = require("./models/notes.model");
const cors = require("cors");
const  path = require("path")
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("./public"))


app.post("/api/notes", async (req, res) => {
  const { tittle, description } = req.body;

  const note = await notesModel.create({
    tittle,
    description,
  });

  res.status(201).json({
    message: "note created successfully",
    note,
  });
});

app.get("/api/notes", async (req, res) => {
  const notes = await notesModel.find();
  res.status(200).json({
    message: "notes fatch successfully",
    notes,
  });
});

app.delete("/api/note/:id", async (req, res) => {
  const { id } = req.params;
  const note = await notesModel.findByIdAndDelete(id);
  res.status(204).end();
});

app.patch("/api/note/:id", async (req, res) => {
  const {id} = req.params;
  const { tittle, description } = req.body;
  const note = await notesModel.findByIdAndUpdate(id, {
    tittle,
    description,
  });

  res.status(200).json({
    message: "note updated successfully",
    note,
  });
});

app.use("*name" , (req ,res)=>{
  res.sendFile(path.join(__dirname , ".." , "/public/index.html"))
})
module.exports = app;
