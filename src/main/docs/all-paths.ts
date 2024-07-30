import {
  loginPath,
  signupPath,
  serviceByIdPath,
  servicesPath,
  serviceSearchPath,
  categoriesByIdPath,
  categoriesPath
} from './paths'

export default {
  '/login': loginPath,
  '/services': servicesPath,
  '/signup': signupPath,
  '/services/{id}': serviceByIdPath,
  '/services/search}': serviceSearchPath,
  '/categories': categoriesPath,
  '/categories/{id}': categoriesByIdPath
}
