import chai from "chai";
import supertest from 'supertest';

const expect = chai.expect;

const requester = supertest('http://localhost:8080')

/*=============================================
   =                   CARTS                =
   =============================================*/

describe("Test de creación de un carrito", () => {



    it("Crear carrito: en este test verificamos si se crea un carrito de manera correcta.", async function () {

        //GIVEN
        let cartMock = {
            products: [
                {
                    product: {},
                    quantity: 1
                }
            ]
        }
        cart = cartMock;

        //THEN
        let result = await requester.post('/carts/').send(cartMock);

        //ASSERT
        expect(result.statusCode).is.equals(201);
        expect(result.statusCode).is.be.ok
        expect(result.body.message).to.equal("Carrito creado con exito con ID: " + result.id, payload.result);

    })

})



//SECCION 2 - ACTUALIZAR CARRITO

describe("test para actualizar carrito", () => {

    it("Actualizar carrito: en este test verificamos que se actulice el carrito de manera correcta", async function () {

        //GIVEN
        let prodId = "64ee2366ec71e4c0df0ba3f9"
        let randomId = "6560e2cd2c6d42864438b321";
        let cartMock =
        {
            products: [
                {
                    product: {},
                    quantity: 10000
                }
            ]
        }


        //THEN
        let result = await requester.put(`/carts/${randomId}/put/${prodId}`).send(cartMock);

        //ASSERT
        expect(result.statusCode).is.equals(201);
        expect(result.statusCode).is.be.ok

    })


})





//SECCION  - ELIMINAR PRODUCTO

describe("Test para eliminar todos los productos del carrito", () => {

    it("Eliminar productos del carrito: en este test verificamos que se eliminen los productos de manera correcta", async function () {

        //GIVEN
        let randomId = "6560e7fcdca98e02e3b8100a"

        //THEN
        let result = await requester.delete(`/carts/${randomId}/clean`);

        //ASSERT
        expect(result.statusCode).is.equals(201);
        expect(result.statusCode).is.be.ok
        expect(result.body.message).to.equal('productos eliminados del carrito correctamente');

    })


})

