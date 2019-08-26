const generateFlowTypes = require('../index.js')

describe('#generateFlowTypes', () => {
  describe('alternative .prettierc', () => {
    const options = {
      prettierConfig: './test/swagger/.prettierrc',
    }

    it('should generate flow types', () => {
      const source = './test/swagger/pet_store.yaml'

      const types = generateFlowTypes(source, options)
      expect(types).toMatchSnapshot()
    })
  })

  describe('.yaml source', () => {
    describe('camelizeKeys is true', () => {
      const options = {
        camelizeKeys: true,
      }

      it('should generate flow types', () => {
        const source = './test/swagger/pet_store.yaml'

        const types = generateFlowTypes(source, options)
        expect(types).toMatchSnapshot()
      })
    })

    describe('camelizeKeys is false', () => {
      const options = {
        camelizeKeys: false,
      }

      it('should generate flow types', () => {
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

      it('should generate flow types', () => {
        const source = './test/swagger/pet_store.json'

        const types = generateFlowTypes(source, options)
        expect(types).toMatchSnapshot()
      })
    })

    describe('camelizeKeys is false', () => {
      const options = {
        camelizeKeys: false,
      }

      it('should generate flow types', () => {
        const source = './test/swagger/pet_store.json'

        const types = generateFlowTypes(source, options)
        expect(types).toMatchSnapshot()
      })
    })
  })

  describe('swagger v2', () => {
    it('should generate flow types', () => {
      const source = './test/swagger/pet_store_v2.json'

      const types = generateFlowTypes(source, {})
      expect(types).toMatchSnapshot()
    })
  })
})
