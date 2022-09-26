const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const bcrypt = require('bcryptjs');
const helpers = {};

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

helpers.encriptarSenha = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

helpers.comparaSenha = async (password, senhaGuardada) => {
  bcrypt.compare(password, senhaGuardada);
};

app.get('/', (req, res) => {
  res.json({
    message: 'Seja-bem vindo aos site de hash-VBA',
  });
});

app.post('/encriptar', async (req, res) => {
  const { senha } = req.body;
  console.log(senha);
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(senha, salt);
  res.send(hash);
});

app.post('/comparar', async (req, res) => {
  const { senha, senhaStore } = req.body;
  const result = await bcrypt.compare(senha, senhaStore);
  console.log(result);
  res.send(result);
});

app.listen(process.env.PORT, () => {
  console.log('Servidor ligado');
});
