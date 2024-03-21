const {request, response} = require("express");
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'app',
    host: 'localhost',
    database: 'catalog',
    password: '!ChangeMe!',
    port: 5432,
});


const getAllMovies = (request, response) => {
    pool.query('SELECT * FROM movie', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getMovieById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM movie WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows);
    })
}


const deleteMovie = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM movie WHERE id = $1', [id],
        (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send('Film supprimer:' + id)
    })
}

const createMovie = (request, response) => {
    const { title = "hello", resume = "hello", imgPath = "Hello" } = request.body

    pool.query('INSERT INTO movie (title, resume, img_path) VALUES ($1, $2, $3)', [title, resume, imgPath],
        (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send('Film ajouter !')
    })
}

const updateMovie = (request, response) => {
    const id = parseInt(request.params.id)
    const {title = "Modifier", resume = "Modifier", imgPath = "Modifier"} = request.body

    pool.query(('UPDATE movie SET title = $1, resume = $2, img_path = $3 WHERE id = $4'), [title, resume, imgPath, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send('Film modifier:' + id)
        })
}


module.exports = {
    getAllMovies,
    getMovieById,
    deleteMovie,
    createMovie,
    updateMovie,
}