import {
  loginPath,
  signupPath,
  serviceByIdPath,
  servicesPath,
  serviceSearchPath,
  categoriesByIdPath,
  categoriesPath,
  accountByIdPath,
  barberByIdPath,
  barbersPath,
} from './paths'

export default {
  '/login': loginPath,
  '/services': servicesPath,
  '/account': accountByIdPath,
  '/signup': signupPath,
  '/services/{id}': serviceByIdPath,
  '/services/search}': serviceSearchPath,
  '/categories': categoriesPath,
  '/categories/{id}': categoriesByIdPath,
  '/barber/{id}': barberByIdPath,
  '/barbers': barbersPath,
}
