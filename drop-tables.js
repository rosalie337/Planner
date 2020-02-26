const client = require('../lib/client');

// async/await needs to run in a function
run();

async function run() {

    try {
        await client.connect();

        await client.query(`
        
            DROP TABLES IF EXIST users;
            DROP TABLES IF EXIST plans;
        
        
        `)

    }

    catch (err) {
        console.long(err);
    }
    finally {
        client.end();
    }
}