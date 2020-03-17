//conf o Servidor
const express = require ("express");
const server = express();

//conf server para apresentar arq estaticos
     //pasta publica        //arq static ==css ==script ==imgs
server.use(express.static('public'));
//habilitar a comunicação body do formulario
server.use(express.urlencoded({extended: true}));
//conf dataBase connection

const {Pool, Client} = require ('pg');
const data = new Pool ({
    host : 'localhost',
    port : 5432,
    user : 'postgres',
    password : '0000',
    database : 'doe'
});
//conf o template engine
const nunjucks = require ("nunjucks");
nunjucks.configure ("./view"/*pasta onde fica o index,html*/, {
    express : server,
    noCache : true
});
//dados apresentados na pagina

//conf a apresentação da pagina
server.get('/', (req, res) => {
    const donors = [];
    res.render('index.html', { donors });
});
//requisitando resultados da pagina
server.post('/', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;
    //colocando no banco de dados
    const txt = 'INSERT INTO donors(name, email, blood) VALUES($1, $2, $3)';
    const values = [name, email, blood];
    data.query = (txt, values);   
});
//ligar o server e permitir o acesso na port 3000
server.listen(3000, () => {
    console.log('server listen port 3000');
});
