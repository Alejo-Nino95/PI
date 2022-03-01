const { Raza, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Raza model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Raza.sync({ force: true }));
    describe('id', () => {
      it('no crea el elemento si id está nulo', (done) => {
        Raza.create({
          imagen: 'https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800',
          altura: '12 - 16',
          peso: '13 - 15',
          anosvida: 12,
          temperamentos: ['Aloof', 'Clownish', 'Dignified', 'Independent', 'Happy']})
          .then(() => done('no crea el registro'))
          .catch(() => done());
      });
    });
    describe('nombre', () => {
      it('no crea el elemento si nombre está nulo', (done) => {
        Raza.create({id: 1000,
          imagen: 'https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800',
          altura: '12 - 16',
          peso: '13 - 15',
          anosvida: 12,
          temperamentos: ['Aloof', 'Clownish', 'Dignified', 'Independent', 'Happy']})
          .then(() => done('no crea el registro'))
          .catch(() => done());
      });
    });
    describe('altura', () => {
      it('no crea el elemento si altura está nula', (done) => {
        Raza.create({id: 1000,
          imagen: 'https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800',
          nombre: 'Pug',
          peso: '13 - 15',
          anosvida: 12,
          temperamentos: ['Aloof', 'Clownish', 'Dignified', 'Independent', 'Happy']})
          .then(() => done('no crea el registro'))
          .catch(() => done());
      });
    });
    describe('peso', () => {
      it('no crea el elemento si peso está nulo', (done) => {
        Raza.create({id: 1000,
          imagen: 'https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800',
          nombre: 'Pug',
          altura: '13 - 15',
          anosvida: 12,
          temperamentos: ['Aloof', 'Clownish', 'Dignified', 'Independent', 'Happy']})
          .then(() => done('no crea el registro'))
          .catch(() => done());
      });
    });
    describe('años de vida', () => {
      it('crea el elemento si años de vida está nulo', (done) => {
        Raza.create({id: 1000,
          imagen: 'https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800',
          nombre: 'Pug',
          altura: '12 - 16',
          peso: '13 - 15',
          temperamentos: ['Aloof', 'Clownish', 'Dignified', 'Independent', 'Happy']})
          .then(() => done())
          .catch(() => done('no crea el registro'));
      });
    });
  });
});
