const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const MovieModel = require('./MovieModel.js');
const cors = require('cors');



app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.get('/', (request, response) => {
    response.send('Hello API!')
});


app.get('/movies', MovieModel.getAllMovies);
app.get('/movies/:id', MovieModel.getMovieById);
app.delete('/movies/delete/:id', MovieModel.deleteMovie);
app.post('/movies/insert', MovieModel.createMovie);
app.put('/movies/update/:id', MovieModel.updateMovie);

app.listen(port, () => {
    console.log(`Application est sur le port: ${port}`)
})

