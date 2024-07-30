import {
  loginPath,
  signupPath,
  serviceByIdPath,
  servicesPath,
  serviceSearchPath,
  categoriesByIdPath
} from './paths'

export default {
  '/login': loginPath,
  '/services': servicesPath,
  '/signup': signupPath,
  '/services/{id}': serviceByIdPath,
  '/services/search}': serviceSearchPath,
  '/categories/{id}': categoriesByIdPath
}
