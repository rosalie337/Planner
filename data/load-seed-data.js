const client = require('../lib/client'); // <---- what is this component?

// import seed data
const planner = require('./planner');

run ();

async function run() {

    try {
        await client.connect();

        // Why only two values?
        await Promise.all(
            planner.map(list => {
                return client.query(`
                    INSERT into list (task, complete, user_id)
                    VALUES ($1, $2, $3); 
                `,
                [list.task, list.complete]);
            })
        );
    } catch (err) {
        console.log(err);
    }
    finally {
        client.end();
    }
}