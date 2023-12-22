import { makeSignUpController } from '../../factories/signup/signup-controller-factory'
import { type HttpRequest } from './../../../presentation/protocols/controller'
import { type Router, type Request, type Response } from 'express'

export default (router: Router): void => {
  router.post('/signup', async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    console.log(httpRequest)
    const httpResponse = await makeSignUpController().handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json(httpResponse.body.message)
    }
  })
}
