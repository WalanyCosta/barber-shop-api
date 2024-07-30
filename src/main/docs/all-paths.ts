import { loginPath, signupPath, serviceByIdPath, servicesPath, serviceSearchPath } from './paths'

export default {
  '/login': loginPath,
  '/services': servicesPath,
  '/signup': signupPath,
  '/service/{id}': serviceByIdPath,
  '/services/search}': serviceSearchPath
}
