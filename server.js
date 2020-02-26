require ('dotenv').config(); // load enviornment data
const express = require('express');// application dependencies
const cors = require('cors');
const morgan = require('morgan');
const client = require('./lib/client');
client.connect(); // initiate database connection

const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); // http logging
app.use(cors());//enable cors request
app.use(express.static('public'));//server files from pubic folder
app.use(express.json());//enable reading incoming json file
app.use(express.urlencoded({ extended:true}));



app.get('/list', async(req, res) => {

    try {
        
        const result = await client.query(`
            SELECT * from list;
        `);
        res.json(result.rows);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.post('/list', async(req, res) => {

    try {
        const result = await client.query(`
            INSERT into list (task, complete)
            VALUES ($1, false)
            returning *;
        `, [req.body.task],
        
        res.json(result.rows[0]);
    }
    catch (err) {
        console.log(err);
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.put('/list/:id', async (req, res) => {
    
    try {
        const result = await client.query(`
        update todos
        set complete=${req.body.complete}
        where id = ${req.params.id}
        returning *;
        `),

        res.json(result.rows[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.delete('/list/:id', async (req, res) => {

    try {
        const result = await client.query(`
            delete from todos where id=${req.params.id}
            returning *;
        `,);

        res.json(result.rows[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log('lets start the show!', PORT);
});