import chai from "chai";
import supertest from 'supertest';

const expect = chai.expect;

const requester = supertest('http://localhost:8080')
    
    
    /*=============================================
    =                   Section 02                =
    =============================================*/
    describe("Testing Login and session with Cookies", () => {

        // Before
        before(function () {
            this.cookie;
            this.mockUser = {
                first_name: "Usuario de prueba 3",
                last_name: "Apellido de prueba 6",
                email: "correodeprueba6@gmail.com",
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
            // console.log(result); // result.headers['set-cookie'][0]
            const cookieResult = result.headers['set-cookie'][0]
            console.log(cookieResult);



            // Assert
            expect(result.statusCode).is.equal(200)

            // extraer cookie
            const cookieData = cookieResult.split("=")
            this.cookie = {
                name: cookieData[0],
                value: cookieData[1]
            }

            expect(this.cookie.name).to.be.ok.and.eql('coderCookie')
            expect(this.cookie).to.be.ok

        })




        // Test 03 - ruta protegida
        it("Test Ruta Protegida: Debe enviar la cookie que contiene el usuario y destructurarla correctamente.", async function () {

            // Given


            // Then
            const { _body } = await requester.get("/api/sessions/current").set('Cookie', [`${this.cookie.name}=${this.cookie.value}`]);

            console.log(_body);




            // Assert
            expect(_body.payload.email).to.be.ok.and.eql(this.mockUser.email)

        })


    })