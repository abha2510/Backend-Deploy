const express = require("express");
const noteRouter = express.Router();
const { NoteModel } = require("../model/note.model");


noteRouter.get("/", async (req, res) => {
  const notes = await NoteModel.find();
  res.send(notes);
});


noteRouter.post("/create", async (req, res) => {
  const payload = req.body;
  const note = new NoteModel(payload);
  await note.save();
  res.send({ msg: "Note created" });
});


noteRouter.patch("/update/:id", async (req, res) => {
  const noteID = req.params.id;
  const payload=req.body;
  const note=await NoteModel.find({"_id":noteID});
  const userID_in_note=note.userID;
  const userID_making_req=req.body.userID;

  try {   
    if(userID_making_req!==userID_in_note){
      res.send({"msg":"You are not authorized"})
    }else{
    await NoteModel.findByIdAndUpdate({"_id":noteID},payload);
    res.send({ msg: `Notes with id ${noteID} has been updated successfully!!` });
    }
  } catch (error) {
    res.send({"msg":"Somethig went wrong","error":error.message})
  }
});


noteRouter.delete("/delete/:id", async (req, res) => {
  const noteID = req.params.id;
  const note=await NoteModel.find({"_id":noteID});
  const userID_in_note=note.userID;
  const userID_making_req=req.body.userID;

  try {   
    if(userID_making_req!==userID_in_note){
      res.send({"msg":"You are not authorized"})
    }else{
    await NoteModel.findByIdAndUpdate({"_id":noteID });
    res.send({ msg: `Notes with id ${noteID} has been deleted successfully!!` });
    }
  } catch (error) {
    res.send({"msg":"Somethig went wrong","error":error.message})
  }
});


module.exports = { noteRouter };


//63ef3aa07be19f4ac3872b2a