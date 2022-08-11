const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const { expect } = chai;

chai.use(chaiHttp);

const url = 'http://localhost:8080';

/*Objeto Usuario*/
const user = {
    "username": "Juan Manuel",
    "email": "juan.vanoyen@test.email",
    "password": "123"
}

const userMod = {
    "username": "Juan Manuel Van Oyen",
    "email": "juan.vanoyen@test.email",
    "password": "1233",
    "id": "62f45fc673486846f5feb5f0"
}


describe("TEST DE API USUARIOS", () => {
    describe("GET /user/:id",  () => {
        it("Devuelve un usuario por su ID",  () => {
            chai.request(url)
            .get('/user/62f1516240d41a644d74e1e0')
            .end((_, res) => {
                expect(res).to.have.status(200)
                expect(res).to.be.json
            })
        })
    })
    describe("POST /user/add",  () => {
        it('Agrega un producto y devuelve 201 o 400', (done) => {
            chai.request(url)
            .post('/user/add')
            .send(user)
            .end( (err,res) => {
                expect(res).to.have.status(201)
                expect(res).to.be.json
                done();
            });
        });
    });
    describe("POST /user/update",  () => {
        it('Actualiza un producto y devuelve 201 o 400', (done) => {
            chai.request(url)
            .post('/user/update')
            .send(userMod)
            .end( (err,res) => {
                expect(res).to.have.status(201)
                expect(res).to.be.json
                done();
            });
        });
    });
    describe("GET /delete/:id",  () => {
        it("Remueve un usuario por su ID, retorna 200 o 404",  () => {
            chai.request(url)
            .get('/user/delete/62f1516240d41a644d74e1e0')
            .end((_, res) => {
                expect(res).to.have.status(200)
                expect(res).to.be.json
            })
        })
    })
});

