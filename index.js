const express = require("express")
const app = express();

const bcrypt = require('bcryptjs')
const helpers = {};

helpers.encriptarSenha = async(password)=>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)
    return hash;
};

helpers.comparaSenha = async (password, senhaGuardada)=>{
    bcrypt.compare(password, senhaGuardada);
};



app.post("/encriptar/:senha", async (req, res)=>{
    const {senha} = req.params;
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(senha, salt)
    res.send(hash)
})

app.post("/comparar/:senha/:senhaStore", async (req, res)=>{
    const {senha, senhaStore} = req.params;
    console.log(senha + senhaStore)
    const result = await bcrypt.compare(senha, senhaStore);
    res.send(result);
})


app.listen(3000, ()=>{
    console.log("Servidor ligado")
})