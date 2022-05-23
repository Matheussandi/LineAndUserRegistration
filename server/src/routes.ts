import { Router } from 'express'

import { UsersController } from './controllers/UsersController'
import { TelephoneLineController } from './controllers/TelephoneLineController'

const routes = Router();

const usersController = new UsersController()
const telephoneLineController = new TelephoneLineController()

routes.post('/users', usersController.create)
routes.get('/users', usersController.index)
routes.get('/users/:id', usersController.show)
routes.delete('/users/:id', usersController.delete)
routes.put('/users/:id', usersController.update)


routes.post('/telephoneline', telephoneLineController.create)
routes.get('/telephoneline', telephoneLineController.index)
routes.get('/telephoneline/:id', telephoneLineController.show)
routes.delete('/telephoneline/:id', telephoneLineController.delete)
routes.put('/telephoneline/:id', telephoneLineController.update)

export { routes }

