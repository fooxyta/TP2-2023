const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(express.json())


const dotenv = require('dotenv')

if (process.env.devouprod === 'dev') {
dotenv.config({path: './config/.env.dev'})
}

if (process.env.devouprod === 'prod') {
    dotenv.config({path: './config/.env.prod'})
}
const modelodeUsuario = mongoose.model('contas', new mongoose.Schema({
    email: String,
    password: String
}))

    mongoose.connect('mongodb://127.0.0.1:27017/macaco')
    .then(function(){

app.post('/get/', async (req,res)=>{
    const usuarioEncontrado = await modelodeUsuario.findOne({email: req.body.email, password: req.body.password})
    if (usuarioEncontrado === null) {
       return res.send('Essa conta não existe')
    }
    res.send(usuarioEncontrado)
})
 
app.post('/post',async (req,res) =>{
    const usuarioCriado = await modelodeUsuario.create({email: req.body.email, password: req.body.password})
    res.send(usuarioCriado)
})

app.put('/put', async (req,res)=>{
    const usuarioAtualizado = await modelodeUsuario.findOneAndUpdate({email: req.body.email, password: req.body.password}, {email: req.body.newemail, password: req.body.newpassword})
    res.send({message: "Seus dados foram atualizados mano"})
})
  
app.delete('/delete', async (req,res)=>{
    const usuarioDeletado = await modelodeUsuario.deleteOne({email: req.body.email, password: req.body.password})
    res.send(usuarioDeletado)
})  

app.use((req,res)=>{
    res.send('Não foi possível encontrar sua rota')
})

app.listen(3000, ()=>console.log(`O servidor ta rodando nessa porta aí meu fiel ${3000}`))

})
