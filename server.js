const express = require('express')
const app = express()
const fs = require('fs')
app.use(express.json())

app.get('/get/:email', (req,res)=>{
    const dados = fs.readFileSync(__dirname+'/'+req.params.email+'.json')
    res.send(dados)
})

app.post('/post', (req,res)=>{
  fs.writeFileSync(req.body.email+'.json', JSON.stringify(req.body))
  res.send('Seus dados foram enviados')
})

app.put('/put', (req,res)=>{
    fs.writeFileSync(req.body.email+'.json', JSON.stringify(req.body), {flag: 'W'})
    res.send('Seus dados foram atualizados')
  })
app.delete('/delete', (req,res)=>{
    fs.unlink(__dirname+'/'+req.body.email+'.json')
    res.send('Seus dados foram deletados')
  })

app.use((req,res)=>{
    res.send('não foi possível encontrar sua rota')
})

app.listen(3000, ()=>console.log(`o servidor ta rodando nessa porta aí meu fiel ${5555}`))