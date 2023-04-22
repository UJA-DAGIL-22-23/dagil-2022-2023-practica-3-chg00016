/**
 * @file server-spec.js
 * @description Fichero con la especificación de las pruebas TDD para server.js del MS MS Plantilla
 *              Este fichero DEBE llamarse server-spec.js
 *              Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Víctor M. Rivas Santos <vrivas@ujaen.es>
 * @date 03-Feb-2023
 */


const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

/**
 * Test para las rutas "estáticas": / y /acerdade
 */
describe('Servidor PLANTILLA:', () => {
  describe('Rutas / y /acercade', () => {
    it('Devuelve MS Plantilla Home Page', (done) => {
      supertest(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: home");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve MS Plantilla Acerca De', (done) => {
      supertest(app)
        .get('/acercade')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: acerca de");
          assert(res.body.autor === "Carmen Huesa Guardiola");
          assert(res.body.email === "chg00016@red.ujaen.es");
          assert(res.body.fecha === "18-04-2023");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
  })

  /**
   * Tests para acceso a la BBDD
   */
  describe('Acceso a BBDD:', () => {
    it('Devuelve ¿¿¿ VALOR ESPERADO ??? al consultar mediante test_db', (done) => {
      supertest(app)
        .get('/test_db')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data[0].data.hasOwnProperty('nombre'));
          assert(res.body.data[0].data.nombre === "Carmen");

        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

  })


  /**
   * Tests para acceso a la lista de arqueros
   */
    describe('Acceso a listado de nombres:', () => {
      it('Devuelve Carmen, nombre de la primera arquera', (done) => {
        supertest(app)
          .get('/get_arqueros')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(function (res) {
            //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
            assert(res.body.data[0].data.hasOwnProperty('nombre'));
            assert(res.body.data[0].data.nombre === "Carmen");
            assert(res.body.data[0].data.nombre != "Pepe");
            assert( res.body.data.length === 10); 
      
          
  
          })
          .end((error) => { error ? done.fail(error) : done(); }
          );
      });
  
    })

  /**
   * Tests para acceso a la lista de arqueros con todos los datos
   */
     describe('Acceso a listado de arqueros:', () => {
      it('Devuelve todos los datos de todos los jugadores', (done) => {
        supertest(app)
          .get('/get_arqueros_completos')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(function (res) {
            //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
            assert( res.body.data.length === 10); 
            assert(res.body.data[0].data.hasOwnProperty('nombre'));
            assert(res.body.data[0].data.hasOwnProperty('apellido'));
            assert(res.body.data[0].data.hasOwnProperty('id'));
            assert(res.body.data[0].data.hasOwnProperty('nacionalidad'));
            assert(res.body.data[0].data.hasOwnProperty('edad'));
            assert(res.body.data[0].data.hasOwnProperty('disparo'));
            assert(res.body.data[0].data.hasOwnProperty('puntuaciones_de_la_tanda'));
          
            
          
  
          })
          .end((error) => { error ? done.fail(error) : done(); }
          );
      });
  
    })
});


