/**
 * @file server-spec.js 
 * @description Fichero con la especificación de pruebas para la aplicación API-gateway
 * Este fichero DEBE llamarse server-spec.js
 * Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

describe('API Gateway: rutas estáticas', () => {
  describe('Rutas estáticas de MS Plantilla', () => {
    it('Devuelve MS Plantilla Home Page', (done) => {
      supertest(app)
        .get('/plantilla/')
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
        .get('/plantilla/acercade')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: acerca de");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });


  /**
   * Tests para acceso a la lista de arqueros
   */
        it('Devuelve Carmen, nombre de la primera arquera', (done) => {
          supertest(app)
            .get('/plantilla/get_arqueros')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (res) {
              //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
              assert(res.body.data[0].data.hasOwnProperty('nombre'));
              assert(res.body.data[0].data.nombre === "Carmen");
              assert(res.body.data[0].data.nombre != "Pepe");
  
    
            })
            .end((error) => { error ? done.fail(error) : done(); }
            );
        });
    
      
  })

  /**
   * Tests para acceso a la lista de arqueros con todos los datos
   */

  it('Devuelve todos los datos de todos los jugadores', (done) => {
    supertest(app)
      .get('/plantilla/get_arqueros_completos')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
        assert(res.body.data[0].data.hasOwnProperty('nombre'));
        assert(res.body.data[0].data.hasOwnProperty('apellido'));
        assert(res.body.data[0].data.hasOwnProperty('id'));
        assert(res.body.data[0].data.hasOwnProperty('nacionalidad'));
        assert(res.body.data[0].data.hasOwnProperty('edad'));
        assert(res.body.data[0].data.hasOwnProperty('disparo'));
        assert(res.body.data[0].data.hasOwnProperty('puntuaciones_de_la_tanda'));
        assert(res.body.data.length === 10);
        
        
      

      })
      .end((error) => { error ? done.fail(error) : done(); }
      );
  });


});



