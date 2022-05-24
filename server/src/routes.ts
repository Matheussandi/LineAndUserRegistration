import { Router } from 'express'

import { UsersController } from './controllers/UsersController'
import { TelephoneLineController } from './controllers/TelephoneLineController'
import { BankController } from './controllers/BankController'

const routes = Router();

const usersController = new UsersController()
const telephoneLineController = new TelephoneLineController()
const bankController = new BankController()

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


routes.post('/bank', bankController.create)
routes.get('/bank', bankController.index)
routes.get('/bank/:id', bankController.show)
routes.delete('/bank/:id', bankController.delete)
routes.put('/bank/:id', bankController.update)

export { routes }

