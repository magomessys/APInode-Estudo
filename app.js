global.db = require('./db')
const express = require('express');
const app = express();         
const bodyParser = require('body-parser'); 
const port = 3000; //porta padrão

//serialização do body da requisição 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router()
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }))
app.use('/', router)

// GET /clientes
router.get('/clientes', (req, res) => global.db.findClientes((err, docs) => {
    if(err) res.status(500).json(err)
    else res.json(docs)
}))

// GET /clientes/{id}
router.get('/clientes/:id', (req, res) => global.db.findCliente(req.params.id, (err, doc) => {
    if(err) res.status(500).json(err)
    else res.json(doc)
}))

// POST /clientes
router.post('/clientes', (req, res) => {
    const cliente = req.body
    global.db.insertCliente(cliente, (err, result) => {
        if(err) res.status(500).json(err)
        else res.json({ message: 'Cliente cadastrado com sucesso!'})
    })
})

// PUT /clientes/{id}
router.put('/clientes/:id', (req, res) => {
    const id = req.params.id
    const cliente = req.body
    global.db.updateCliente(id, cliente, (err, result) => {
        if(err) res.status(500).json(err)
        else res.json({ message: 'Cliente atualizado com sucesso!'})
    })
})

// PATCH /clientes/{id}
router.patch('/clientes/:id', (req, res) => {
    const id = req.params.id
    const updates = req.body
    global.db.patchCliente(id, updates, (err, result) => {
        if(err) res.status(500).json(err)
        else res.json({ message: 'Cliente atualizado com sucesso!'})
    })
})

// DELETE /clientes/{id}
router.delete('/clientes/:id', (req, res) => {
    const id = req.params.id
    global.db.deleteCliente(id, (err, result) => {
        if(err) res.status(500).json(err)
        else res.json({ message: 'Cliente excluído com sucesso!'})
    })
})


//inicia o servidor
app.listen(port)
console.log('API funcionando!')

