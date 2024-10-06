const Note = require("../models/noteModel");
const asyncHandler = require("express-async-handler");

const getNotes = asyncHandler(async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id });
        res.json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

const createNotes = asyncHandler(async(req,res) =>{
    const {title,content , category} = req.body;
    if(!title || !content || !category){
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    else{
        const note = new Note({user:req.user._id , title , content , category});
        const createdNotes = await note.save();
        res.status(201).json(createdNotes);
    }
})

const getNoteById = asyncHandler(async(req, res)=>{
    const note = await Note.findById(req.params.id);
    if(note){
        res.json(note);
    }
    else{
        res.json("note not found");
    }
})
const updateNote = asyncHandler(async(req, res)=>{
    const {title,content , category} = req.body;
    const note = await Note.findById(req.params.id);
    if(note.user.toString() !== note.user._id.toString()){
        res.status(401)
        throw new Error("you can't perform this action");
    }
    if(note){
        note.title = title;
        note.content = content;
        note.category = category;

        const updatedNote = await note.save();
        res.json(updatedNote);

    }
    else{
        res.json("no note found");
    }
   
})

const deleteNote = asyncHandler(async(req,res)=>{
    const note = await Note.findById(req.params.id);
    if(note.user.toString() !== note.user._id.toString()){
        res.status(401)
        throw new Error("you can't perform this action");
    }
    if(note){
        await note.deleteOne();
        res.json("note removed")
    }
    else{
        res.json("no note found");
    }
})

module.exports = {getNotes , createNotes , getNoteById , updateNote , deleteNote};