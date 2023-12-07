const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/livya');

const user = mongoose.model('user', {
  email: String,
  password: String,
  name: String,
});

const poesia = mongoose.model('poesia', {
  userId: String,
  titulo: String,
  poesia: String,
  likes: { type: Number, default: 0 },
});

app.post('/cadastro', async (req, res) => {
    const dados = await user.create({
        email: req.body.email,
        password: req.body.senha,
        name: req.body.name,
    })
    res.json({ message: 'Cadastrou' })

});

app.post('/login', async (req, res) => {
    const user = await user.findOne({ email: req.body.email });
    if (!user) {
        res.json({ message: 'Email ou senha incorretos.' });
    }else{
        res.json({ message: 'Entrou' });
    }

});

app.post('/deletar', async (req, res) => {
    const user = await user.deleteOne({ email: req.body.email });
    res.json({ message: 'Excluido com sucesso' });


});

app.post('/poesia', async (req, res) => {
    const dados2 = await user.findOne({ email: req.body.email });
    const dados = await poesia.create({
        userId: dados2._id,
        titulo: req.body.titulo,
        poesia: req.body.poesia,
    })

    res.json({ message: 'Poesia Cadastrada com sucesso.' });
  });

app.post('/like', async (req, res) => {
    const poetry = await poesia.findById(req.body.poesiaId);
    if (!poetry) {
        return res.status(404).json({ message: 'Poesia não encontrada.' });
    }
    poetry.likes += 1;
    await poetry.save();
    res.json({ message: 'Curtida adicionada!' });
});


app.listen(port);