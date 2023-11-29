import chai from "chai";
import supertest from 'supertest';

const expect = chai.expect;

const requester = supertest('http://localhost:8080')

// Contexto global
describe("Testing Adopme App", () => {


    /*=============================================
    =                   PRODUCTS              =
    =============================================*/
    // Contexto local
    describe("Testing Products Api", () => {

        // Test 01
        it("Crear producto: El API POST api/products/createOne debe crear un nueva producto correctamente", async () => {
            // Given
            const productMock = {
                title: "Auriculares",
                description: "Logitech",
                price: 20000,
                thumbnail: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQGm5aLDuI2kSGY-7mbc2liqirdPVUl_rOtnMYtHyD3M2UyouqOXxbP-PUSLpCyJeyWUU2oQ4jxoGNC1DM2lOwuMymwIYSHE6V2J7W_KOLAklKScNSekYVeiWZpIa9yCiAh-yzfjw&usqp=CAc",
                code: "123",
                stock: 2,
                available: true
            }


            // Then
            const { statusCode, ok, _body } = await requester.post('/api/products/createOne').send(productMock)
            // console.log(result);


            // Assert
            expect(statusCode).is.eqls(200)
            expect(_body.payload).is.ok.and.to.have.property("_id")
            expect(_body.payload).to.have.property('available').and.to.be.deep.equal(true)

        })


        // Test 02
        it("Crear producto sin precio: El API POST /api/products/createOne debe retornar un estado HTTP 400 con error.", async () => {

            // Given
            const productMock = {
                title: "Auriculares",
                description: "Logitech",
                thumbnail: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQGm5aLDuI2kSGY-7mbc2liqirdPVUl_rOtnMYtHyD3M2UyouqOXxbP-PUSLpCyJeyWUU2oQ4jxoGNC1DM2lOwuMymwIYSHE6V2J7W_KOLAklKScNSekYVeiWZpIa9yCiAh-yzfjw&usqp=CAc",
                code: "123",
                stock: 2,
                available: true
            }


            // Then
            const { statusCode, _body } = await requester.post('/api/products/createOne/').send(productMock)


            // Assert
            expect(statusCode).is.eqls(400)
            expect(_body).is.ok.and.to.have.property('error')
            expect(_body).to.have.property('error');
        })


    })

})
