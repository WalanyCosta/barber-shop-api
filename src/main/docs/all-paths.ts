import {
  loginPath,
  signupPath,
  serviceByIdPath,
  servicesPath,
  serviceSearchPath,
  categoriesByIdPath,
  categoriesPath,
  accountByIdPath
} from './paths'
import { barberByIdPath } from './paths/barber'

export default {
  '/login': loginPath,
  '/services': servicesPath,
  '/account': accountByIdPath,
  '/signup': signupPath,
  '/services/{id}': serviceByIdPath,
  '/services/search}': serviceSearchPath,
  '/categories': categoriesPath,
  '/categories/{id}': categoriesByIdPath,
  '/barber/{id}': barberByIdPath
}
