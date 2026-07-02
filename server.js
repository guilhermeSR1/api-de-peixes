import express from 'express';
import path from 'path'; 
import { fileURLToPath } from 'url'; 

const app = express();
const PORT = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/arquivos', express.static('./public'));

const peixes = [
    { 
        id: 1, 
        nome: "Pirarucu", 
        imagem: "http://localhost:3000/api/foto/pirarucu" ,
        descricao: "O pirarucu é um dos maiores peixes de águas doces fluviais e lacustres do Brasil. Seu nome se originou de dois termos tupis: pirá, 'peixe' e uruku, nome de uma tinta vermelha extraída do urucum.",
        audio: "http://localhost:3000/api/audio/pirarucu"
    }
];

app.get('/api/peixes', (req, res) => {
    res.status(200).json(peixes);
});

app.get('/api/audio/:nome', (req, res) => {
    const nomeDoAudio = req.params.nome;
    res.sendFile(path.join(__dirname, 'public/audio', `${nomeDoAudio}.mp3`));
});

app.get('/api/peixes/descricao/:nome', (req, res) => {
    const nomeBusca = req.params.nome.toLowerCase(); 
    const peixe = peixes.find(p => p.nome.toLowerCase() === nomeBusca);

    if (!peixe) {
        return res.status(404).json({ erro: "Peixe não encontrado para essa descrição" });
    }

    res.send(`Descrição do ${peixe.nome}: ${peixe.descricao}`);
});
app.get('/api/info', (req, res) => {
    res.status(200).send("essa API tem muitos peixes");
});

app.get('/api/peixes/:id', (req, res) => {
    const { id } = req.params;
    const peixe = peixes.find(p => p.id === parseInt(id));
    
    if (!peixe) {
        return res.status(404).json({ erro: "Peixe não encontrado" });
    }
    res.json({ nome: peixe.nome });
});

app.listen(PORT, () => console.log(`Servidor ativo em http://localhost:${PORT}`));