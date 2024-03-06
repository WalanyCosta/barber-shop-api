import { type HttpRequest } from '../../../presentation/protocols/controller'
import { type Router, type Request, type Response } from 'express'
import { makeLoginController } from '../../factories/login/login-controller-factory'

export default (router: Router): void => {
  router.post('/login', async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await makeLoginController().handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json(httpResponse.body.message)
    }
  })
}
