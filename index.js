const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
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
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/encriptar', async (req, res) => {
  const { password } = req.body;
  console.log(password);
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  res.send(hash);
});

app.post('/comparar', async (req, res) => {
  const { password, savedPassword } = req.body;
  const result = await bcrypt.compare(password, savedPassword);
  console.log(result);
  res.send(result);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor ligado');
});
