const { Router } = require('express');
const axios = require('axios');
const { Raza, Temperamento } = require('../db');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

var idRaza = 1000;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async (req, res) => {
    const { name } = req.query

    const apiData = await axios.get('https://api.thedogapi.com/v1/breeds')
    const bdData = await Raza.findAll({
        attributes: ['id', 'nombre', 'peso', 'imagen'],
        include: [{
            model: Temperamento,
            attributes: ['nombre'],
            through: {
                attributes: []
            }
        }]
    })
    let raza = apiData.data.map(r => {
        return {
            id: r.id,
            imagen: r.image.url,
            nombre: r.name,
            temperamento: r.temperament,
            peso: r.weight.metric
        }
    })
    raza = raza.concat(bdData);

    if (name) {
        raza = raza.filter(r => r.nombre.toLowerCase().includes(name.toLowerCase()))
        if (raza.length) return res.status(200).json(raza)
        else return res.status(404).json('No existe una raza con ese nombre')
    }

    res.json(raza);
})

router.get('/dogs/:idRaza', async (req, res) => {
    var raza;
    const { idRaza } = req.params;
    if (idRaza >= 1000) {
        raza = await Raza.findOne({
            where: { id: idRaza }
        })
        if (raza) return res.json(raza)
    } else {
        const apiData = await axios.get('https://api.thedogapi.com/v1/breeds');
        const razaArray = apiData.data.map(r => {
            return {
                id: r.id,
                nombre: r.name
            }
        });
        raza = razaArray.find(r => r.id === parseInt(idRaza))
        if (raza) {
            const apiRaza = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${raza.nombre}`)
            const razaBuscada = apiRaza.data.map(r => {
                return {
                    imagen: `https://cdn2.thedogapi.com/images/${r.reference_image_id}.jpg`,
                    nombre: r.name,
                    temperamento: r.temperament,
                    altura: r.height.metric,
                    peso: r.weight.metric,
                    anosvida: r.life_span
                }
            })
            return res.json(razaBuscada)
        }
    }
    res.status(404).send('No existe esa raza');
})

router.get('/temperament', async (req, res) => {
    var tempf = [];
    const apiData = await axios.get('https://api.thedogapi.com/v1/breeds');
    let temp = apiData.data.map(r => { return r.temperament })
    temp = temp.filter(t => t !== undefined)
    temp = temp.map(t => t.split(','))
    temp = temp.map(at => {
        return at.map(t => t.trim())
    })
    for (let i = 0; i < temp.length; i++) {
        tempf = tempf.concat(temp[i])
    }
    tempf = tempf.map(t => {
        Temperamento.findOrCreate({
            where: { nombre: t }
        })
    })
    const tempBd = await Temperamento.findAll({
        attributes: ['nombre']
    });
    res.json(tempBd);
})

router.post('/dog', async (req, res) => {
    const { imagen, nombre, altura, peso, anosvida, temperamentos } = req.body;
    let temp = [];
    await Raza.create({
        id: idRaza,
        imagen,
        nombre,
        altura,
        peso,
        anosvida
    })
    const razaNueva = await Raza.findOne({
        where: { nombre: nombre }
    })
    for (let i = 0; i < temperamentos.length; i++) {
        temp.push(await Temperamento.findOne({
            where: { nombre: temperamentos[i] },
            attributes: ['id']
        }))
    }
    razaNueva.setTemperamentos(temp)
    idRaza++;
    res.json('Registro exitoso')
})

module.exports = router;
