import express, { application, urlencoded } from 'express';
import './app.css';

app.use(json());
app.use(urlencoded({ extended: true}));
app.use(express.static('./public'));

app.get('/', (req, res) =>{
    res.send("<h1>Hello world!!!</h1>");
})

app.listen(3334, () => {
    console.log("Listening on port 3334")
})