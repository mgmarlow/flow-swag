const generateFlowTypes = require('../index.js')

describe('#generateFlowTypes', () => {
  describe('.yaml source', () => {
    describe('camelizeKeys is true', () => {
      const options = {
        camelizeKeys: true,
      }

      it('should generate swagger', () => {
        const source = './test/swagger/pet_store.yaml'

        const types = generateFlowTypes(source, options)
        expect(types).toMatchSnapshot()
      })
    })

    describe('camelizeKeys is false', () => {
      const options = {
        camelizeKeys: false,
      }

      it('should generate swagger', () => {
        const source = './test/swagger/pet_store.yaml'

        const types = generateFlowTypes(source, options)
        expect(types).toMatchSnapshot()
      })
    })
  })

  describe('.json source', () => {
    describe('camelizeKeys is true', () => {
      const options = {
        camelizeKeys: true,
      }

      it('should generate swagger', () => {
        const source = './test/swagger/pet_store.json'

        const types = generateFlowTypes(source, options)
        expect(types).toMatchSnapshot()
      })
    })

    describe('camelizeKeys is false', () => {
      const options = {
        camelizeKeys: false,
      }

      it('should generate swagger', () => {
        const source = './test/swagger/pet_store.json'

        const types = generateFlowTypes(source, options)
        expect(types).toMatchSnapshot()
      })
    })
  })
})
