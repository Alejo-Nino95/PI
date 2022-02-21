const { Router } = require('express');
const axios = require('axios');
const { Raza, Temperamento } = require('../db')

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
        attributes: ['nombre', 'peso'],
        include: Temperamento
    })
    let raza = apiData.data.map(r => {
        return {
            imagen: r.image.url,
            nombre: r.name,
            temperamento: r.temperament,
            peso: r.weight.metric
        }
    })
    raza = raza.concat(bdData);

    if (name) {
        raza = raza.filter(r => r.nombre.toLowerCase().includes(name.toLowerCase()))
        if (raza.length) return res.json(raza)
        else return res.status(404).send('No existe una raza con ese nombre')
    }

    res.json(raza);
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

router.post('/dog', async (req,res) => {
    const { nombre, altura, peso, anosvida } = req.body;
    await Raza.create({
        id: idRaza,
        nombre,
        altura,
        peso,
        anosvida
    })
    idRaza++;
    res.json('Registro exitoso')
})

module.exports = router;
