const mongoClient = require("mongodb").MongoClient
mongoClient.connect("mongodb://magomes:ujbg45k2@naboo.mongodb.umbler.com:41049/magomesmongo")
	.then(conn => global.conn = conn.db("magomesmongo"))
	.catch(err => console.log(err))

//Busca todos clientes    
function findClientes(callback){
    global.conn.collection('clientes').find().toArray(callback)
}

const ObjectId = require("mongodb").ObjectId
function findCliente(id, callback){
	global.conn.collection('clientes').findOne(new ObjectId(id), callback)
}

function insertCliente(cliente, callback){
	global.conn.collection('clientes').insert(cliente, callback)
}

function updateCliente(id, cliente, callback){
	global.conn.collection('clientes').update({_id: new ObjectId(id)}, cliente, callback)
}

function patchCliente(id, updates, callback){
	global.conn.collection('clientes').update({_id: new ObjectId(id)}, { $set: updates }, callback)
}

function deleteCliente(id, callback){
	global.conn.collection('clientes').deleteOne({_id: new ObjectId(id)}, callback)
}

module.exports = {findClientes, findCliente, insertCliente, updateCliente,
                  patchCliente, deleteCliente}
