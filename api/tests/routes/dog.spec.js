/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Raza, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  id: 1000,
  imagen: 'https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800',
  nombre: 'Pug',
  altura: '12 - 16',
  peso: '13 - 15',
  anosvida: '12',
  temperamentos: ['Aloof', 'Clownish', 'Dignified', 'Independent', 'Happy']
};

describe('Dog routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Raza.sync({ force: true })
    .then(() => Raza.create(dog)));
  describe('GET /dogs', () => {
    it('deberia recibir 200', () =>
      agent.get('/dogs').expect(200)
    );
    it('deberia recibir 172 elementos', () =>
      agent.get('/dogs').expect(function (res) {
        expect(res.body).to.have.length(173)
      })
    );
    it('deberia recibir 404', () =>
      agent.get('/dogs?name=Holi').expect(404)
    );
    it('deberia recibir 200 con el elemento creado', () =>
      agent.get('/dogs?name=PUG').expect(200)
    );
    it('deberia recibir el elemento creado', () =>
      agent.get('/dogs?name=PUG').expect(function (res) {
        expect(res.body).to.have.length(2)
      })
    );
  });
});
