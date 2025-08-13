const noteModel = require('../model/note');
const SECRET_KEY = "NOTESAPI";

const createNote = async (req, res) => {
    const { title, description } = req.body;

    const newNote = new noteModel({
        title: title,
        description: description,
        userId: req.userId // Assuming req.userId is set by authentication middleware
    });
    try {
        const savedNote = await newNote.save();
        res.status(201).json({ message: "Note created successfully", note: savedNote });
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

const updateNote = async (req, res) => {

    const id = req.params.id; // Assuming the note ID is passed as a URL parameter
    const { title, description } = req.body;
    
    const newNote = {
        title: title,
        description: description,
        userId: req.userId // Assuming req.userId is set by authentication middleware
    };

    try {

        await noteModel.findByIdAndUpdate(id, newNote, { new: true });
        res.status(200).json({ message: "Note updated successfully" });
        
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
 
}
const deleteNote = async (req, res) => {

    const id = req.params.id; // Assuming the note ID is passed as a URL parameter

    try {
        await noteModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Note deleted successfully" });
        
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }

    
}

const getNotes = async (req, res) => {

    try {
        const notes = await noteModel.find({ userId: req.userId }); // Fetch notes for the authenticated user
        res.status(200).json(notes);
        
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }


}

module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getNotes
};


