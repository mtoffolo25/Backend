import chai from "chai";
import supertest from 'supertest';

const expect = chai.expect;

const requester = supertest('http://localhost:8080')
    
    
    /*=============================================
    =                   SESSIONS                =
    =============================================*/
    describe("Testing Login and session with Cookies", () => {

        // Before
        before(function () {
            this.cookie;
            this.mockUser = {
                first_name: "Usuario de prueba 3",
                last_name: "Apellido de prueba 6",
                email: "correodeprueba77@gmail.com",
                age: 23,
                password: "123456"
            }
        })


        // Test 01 - registro user
        it("Test Registro Usuario: Debe poder registrar correctamente un usuario", async function () {

            // Given
            console.log(this.mockUser);


            // Then
            const { statusCode } = await requester.post('/register').send(this.mockUser);


            // Assert
            expect(statusCode).is.eqls(200)
        })



        // Test 02 - Login user
        it("Test Login Usuario: Debe poder hacer login correctamente con el usuario registrado previamente.", async function () {

            // Given
            const mockLogin = {
                email: this.mockUser.email,
                password: this.mockUser.password,
            }

            // Then
            const result = await requester.post('/login').send(mockLogin);



            // Assert
            expect(result.statusCode).is.equal(200)


        })

    })