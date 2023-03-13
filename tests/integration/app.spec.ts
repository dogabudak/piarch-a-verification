import * as request from 'supertest'
import app from '../../app'


describe('GET / - test token verification endpoints', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })
    describe('GET / - Api call is successful', () => {
        it('Get 404 when token is not valid', async () => {

            const result = await request(app).get('/verify/123123123')
            expect(result.statusCode).toEqual(404)
        })

    })


})