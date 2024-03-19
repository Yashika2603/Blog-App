const express = require('express');
const app = express();
const path = require("path");
const mongoose = require('mongoose'); 
const session = require('express-session');
const dotenv = require("dotenv");
app.use(express.static(path.join(__dirname,"static")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({
    secret: 'your-secret-key',
}));//hum alag se secret key provide karte hai 
app.set('view engine','hbs');
const PORT = process.env.PORT || 3333
dotenv.config();
app.use("/",require("./routes/usersRoutes"));
app.use("/",require("./routes/blogsRoutes"));

mongoose.connect(`mongodb://127.0.0.1:27017/Blogs`)
.then(()=>{
    app.listen(PORT,()=>
    {
        console.log("server started");
    })
});