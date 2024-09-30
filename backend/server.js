const express = require("express");
const notes = require( "./data/notes");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require('./routes/userRoutes')
const connectDB = require('./config/db');
const { notFound , errorHandler } = require('./middlewares/errorMiddleware')


app.use(cors());
app.use(express.json());


dotenv.config();
connectDB();
app.get('/' ,(req, res)=> {
    res.send('Hello World!');
})

app.get('/api/notes' , (req,res)=>{
    res.json(notes);
})

app.get('/api/notes/:id', (req,res)=>{
    const note = notes.find((n)=> n._id === req.params.id)
    res.json(note);
})
app.use('/api/users' , userRoutes );
app.use(notFound);
app.use(errorHandler);



const PORT = process.env.PORT || 5000;
app.listen(5000 , console.log(`server running on port ${PORT}`));