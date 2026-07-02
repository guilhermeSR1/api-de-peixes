import express from 'express';
import path from 'path'; 
import { fileURLToPath } from 'url'; 

const app = express();


const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/arquivos', express.static('./Projeto/public'));

const peixes = [
    { 
        id: 1, 
        nome: "Pirarucu", 
        imagem: "/api/foto/pirarucu" ,
        descricao: "O pirarucu é um dos maiores peixes de águas doces fluviais e lacustres do Brasil. Seu nome se originou de dois termos tupis: pirá, 'peixe' e uruku, nome de uma tinta vermelha extraída do urucum.",
        audio: "/api/audio/pirarucu"
    },
    {
        id: 2,
        nome: "Tilapia",
        imagem: "/api/foto/tilapia",
        descricao: "Tilápia é o nome comum dado a várias espécies de peixes ciclídeos de água doce pertencentes à subfamília Pseudocrenilabrinae e em particular ao gênero Tilápia.",
        audio: "/api/audio/tilapia"
    },
    {
        id: 3,
        nome: "Baiacu",
        imagem: "/api/foto/baiacu",
        descricao: "Baiacu é a designações populares para diversos peixes da ordem dos Tetraodontiformes, comuns na fauna fluvial da América do Sul e, mais especificamente, do Brasil.",
        audio: "/api/audio/baiacu"
    },
    {
        id: 4,
        nome: "humuhumunukunukuapua",
        imagem: "/api/foto/humuhumunukunukuapua",
        descricao: "Rhinecanthus rectangulus é uma das várias espécies de cangulo, também chamados de peixe-porco. Classificado como Rhinecanthus rectangulus, o cangulo-havaiano ou peixe-porco-havaiano é um peixe da família Balistidae, endêmico do Indo-Pacífico. ",
        audio: "/api/audio/humuhumunukunukuapua"
    },
    {
        id: 5,
        nome: "timalo",
        imagem: "/api/foto/timalo",
        descricao: "O tímalo (gênero Thymallus) é um peixe de água doce pertencente à família Salmonidae (a mesma dos salmões e trutas). Eles são nativos de águas frias, rios e lagos no Hemisfério Norte, incluindo Europa, Ásia e América do Norte",
        audio: "/api/audio/timalo"
    },
    {
        id: 6,
        nome: "pirarara",
        imagem: "/api/foto/pirarara",
        descricao: "A pirarara é um peixe da família Pimelodidae que pode ser encontrado na bacia dos rios Araguaia, Tocantins, Amazonas, Orinoco e Essequibo, localizados no Brasil, Venezuela, Peru, Equador, Colômbia, Bolívia, Guiana e Suriname. É também conhecido como 'cajaro' na Venezuela e 'banana catfish' na Guiana.",
        audio: "/api/audio/pirara", 
    },
    {
        id: 7,
        nome: "tubarao",
        imagem: "/api/foto/tubarao",
        descricao: "Tubarão ou cação é um tipo de peixe de esqueleto cartilaginoso e um corpo hidrodinâmico pertencente à superordem Selachimorpha. Os primeiros tubarões conhecidos viveram há aproximadamente 400 milhões de anos.",
        audio: "/api/audio/tubarao"
    },
    {
        id: 8,
        nome: "naopeixe",
        imagem: "/api/foto/naopeixe",
        descricao: "tenho toda certeza que isso não é um peixe",
        audio: "/api/audio/naopeixe"
    }
];


app.get('/api/peixes', (req, res) => {
    res.status(200).json(peixes);
});

app.get('/api/foto/:nome', (req, res) => {
    const nomeDaFoto = req.params.nome;
    const caminhoArquivo = path.join(__dirname, 'Projeto', 'public', 'Imagens', `${nomeDaFoto}.png`);
    res.sendFile(caminhoArquivo, (err) => {
        if (err) {
            if (!res.headersSent) {
                res.status(404).json({ erro: "Imagem do peixe não encontrada" });
            }
        }
    });
});

app.get('/api/audio/:nome', (req, res) => {
    const nomeDoAudio = req.params.nome;
    res.sendFile(path.join(__dirname, 'Projeto', 'public', 'audio', `${nomeDoAudio}.mp3`));
});

app.get('/api/info', (req, res) => {
    res.status(200).send("essa API tem muitos peixes");
});

app.get('/api/descricao/:nome', (req, res) => {
    const nomeBusca = req.params.nome.toLowerCase(); 
    const peixe = peixes.find(p => p.nome.toLowerCase() === nomeBusca);

    if (!peixe) {
        return res.status(404).json({ erro: "Peixe não encontrado para essa descrição" });
    }

    res.send(`Descrição do ${peixe.nome}: ${peixe.descricao}`);
});

app.get('/api/peixes/:id', (req, res) => {
    const { id } = req.params;
    const peixe = peixes.find(p => p.id === parseInt(id));
    
    if (!peixe) {
        return res.status(404).json({ erro: "ID não encontrado" });
    }
    res.json({ nome: peixe.nome });
});


app.listen(PORT, () => console.log(`Servidor ativo na porta ${PORT}`));