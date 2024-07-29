import { type Router } from 'express'
import { auth } from '../config/auth'
import adapterRoute from '@/main/adapter/express/express-route-adapter'
import { makeLoadCategoriesFactory } from '../factories/category/load-categories-factory'
import { makeLoadCategoryByIdRepositoryFactory } from '../factories/category/load-category-by-id-factory'

export default (router: Router): void => {
  router.get('/categories', auth, adapterRoute(makeLoadCategoriesFactory()))
  router.get('/categories/:id', auth, adapterRoute(makeLoadCategoryByIdRepositoryFactory()))
}
