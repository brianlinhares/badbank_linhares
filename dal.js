const mongodb = require("mongodb");
require('dotenv').config()
//================================CONNECTS TO DB================================
const connectionURL =`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PWD}@cluster0.z6gilfq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const dbName = "myproject"
//================================GET MONGODB================================
const MongoClient = mongodb.MongoClient;
let db = null;
MongoClient.connect(connectionURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
},(err,connectedClient) => {
    if(err){
        throw err;
    }
    db = connectedClient.db(dbName);
})
//================================CREATE ACCOUNT================================
function create(name, email, password){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0, transactions: []};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}
//================================FIND ACCOUNT================================
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}
//================================FINDONE ACCOUNT================================
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}
//================================DEPOSIT/WITHDRAW================================
function update(email, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount},
                $push: { transactions: amount }},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );      
    });    
}
//================================ALL ACCOUNTS================================
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}
module.exports = {create, findOne, find, update, all};