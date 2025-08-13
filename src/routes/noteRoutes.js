const express = require("express");
const auth = require("../middleware/auth");
const { getNotes, createNote, deleteNote, updateNote } = require("../controller/noteController");
const noteRouter = express.Router();

noteRouter.post("/", auth, createNote );

noteRouter.get("/", auth, getNotes);

noteRouter.delete("/:id", auth, deleteNote);

noteRouter.put("/:id", auth, updateNote);

module.exports = noteRouter;
