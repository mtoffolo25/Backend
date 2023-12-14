import chai from "chai";
import supertest from 'supertest';

const expect = chai.expect;

const requester = supertest('http://localhost:8080')

/*=============================================
   =                   CARTS                =
   =============================================*/

// CREACIÓN DE UN PRODUCTO

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

        //THEN
        let result = await requester.post('/carts/').send(cartMock);

        //ASSERT
        expect(result.statusCode).is.equals(200);
        expect(result.statusCode).is.be.ok

    })

})


// ELIMINAR PRODUCTO

describe("Test para eliminar todos los productos del carrito", () => {

    it("Eliminar carrito: en este test verificamos que se elimine el carrito de manera correcta", async function () {

        //GIVEN
        let randomId = "6560e7fcdca98e02e3b8100a"

        //THEN
        let result = await requester.delete(`/carts/${randomId}/clean`);

        //ASSERT
        expect(result.statusCode).is.equals(200);
        expect(result.statusCode).is.be.ok

    })

})

