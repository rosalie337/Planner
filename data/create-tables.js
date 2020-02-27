const client = require('../lib/client');// <---- what is this component?

// async/await needs to run in a function
run();

async function run() {

    try {
        // initiate connecting to database
        await client.connect();

        // run a query to create tables in SQL
        // what is the hash in the Create Tables user? password?
        await client.query(`
                CREATE TABLE users (
                    id SERIAL PRIMARY KEY,
                    username VARCHAR(256) NOT NULL,
                    hash VARCHAR(512) NOT NULL, 
                    display_name VARCHAR(256) NOT NULL
                );           
                CREATE TABLE list (
                    id SERIAL PRIMARY KEY NOT NULL,
                    quote VARCHAR(512) NOT NULL,
                    task VARCHAR(512) NOT NULL,
                    user_id INTEGER NOT NULL REFERENCES user(id),
                    character VARCHAR(256) NOT NULL,
                    image VARCHAR(512) NOT NULL,
                    complete BOOLEAN NOT NULL DEFAULT FALSE
            );
        `);

        console.log('create tables complete');
    }
    catch (err) {
        // see if there is there an error
        console.log(err);
    }
    finally {
        // success or failure, need to close the database connection
        client.end();
    }

}