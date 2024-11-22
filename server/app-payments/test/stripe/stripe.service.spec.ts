import { StripeService } from 'src/stripe/stripe.service'

describe('CatsController', () => {
  let catsService: StripeService

  beforeEach(() => {
    catsService = new CatsService()
    catsController = new CatsController(catsService)
  })

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test']

      jest.spyOn(catsService, 'findAll').mockImplementation(() => result)

      expect(await catsController.findAll()).toBe(result)
    })
  })
})
