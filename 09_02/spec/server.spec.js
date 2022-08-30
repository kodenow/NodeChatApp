const { iteratee } = require("lodash")

describe('calc', () => {
    it('should multiply 2 and 2', () => {
        expect(2*2).toBe(4)
    })
})

describe('get messages', () => {
    it('should return 200 ok', () => {
        request.get('http://localhost:3000/messages', (err, res) => {
            console.log(res)
        })
    })
})