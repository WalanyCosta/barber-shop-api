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
  timeschedulesByBarberIdAndDatePath,
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
  '/timeschedules/{barberId}/times': timeschedulesByBarberIdAndDatePath,
}
