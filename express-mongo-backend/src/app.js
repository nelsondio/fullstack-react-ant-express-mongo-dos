import express, { application, urlencoded } from 'express';
import './app.css';

const app = express();

const port = process.env.PORT || 3334;

app.use(express.json());
app.use(urlencoded({ extended: true}));
app.use(express.static('./public'));

app.get('/', (req, res) =>{
    res.send("<h1>Hello world!!!</h1>");
});


const recipeRoutes = require("./routes/recipes");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname +'/public'));

app.use('/api/recipes', recipeRoutes);

app.listen(port, function(){
    //console.log("APP IS RUNNING ON PORT " + process.env.PORT);
    console.log("APP IS RUNNING ON PORT " + port);
})
