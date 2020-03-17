const {Pool, Client} = require ('pg');
const pool = new Pool ({
    host : 'localhost',
    port : 5432,
    user : 'postgres',
    password : '0000',
    database : 'doe'
});

/*pool.query('SELECT * FROM donors', (err, res) => {
    console.log(err, res);
});*/

const txt = 'INSERT INTO donors(name, email, blood) VALUES($1, $2, $3)';
const values = ['fulano', 'fulano@gmail.com', 'A+'];

pool.query(txt, values);
