let {MongoClient} = require('mongodb');

let url = 'mongodb://127.0.0.1:27017/';
let client;
let db;
let dbName = 'library';

async function getconnection(){
    client = new MongoClient(url);
    await client.connect();
    db = client.db(dbName);
    console.log("Connected to db");
}

let getdb = ()=>{
    return db;
}

let closedb = ()=>{
    client.close();
    console.log("Exited db")
}

module.exports = {getconnection,getdb,closedb};