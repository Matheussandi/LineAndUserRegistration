import { Request, response, Response } from 'express'
import { BankServices } from '../services/BankServices'

class BankController {

  async create(request: Request, response: Response) {
    const { bank_branch, account, cpf, name, salary } = request.body

    const bankServices = new BankServices()

    try {
      const bank = await bankServices.create({ bank_branch, account, cpf, name, salary })
      return response.json(bank)
    } catch (err) {
      return response
        .status(400)
        .json({ message: err.message })
    }
  }

  async index(request: Request, response: Response) {
    const bankServices = new BankServices()

    try {
      const bank = await bankServices.index()
      return response.json(bank)
    } catch (err) {
      return response
        .status(400)
        .json({ message: err.message })
    }
  }

  async show(request: Request, response: Response) {
    const bankServices = new BankServices()
    // parametro na rota - request.params
    const { id } = request.params
    // const id = request.params.id

    try {
      const bank = await bankServices.show({ id })
      return response.json(bank)
    } catch (err) {
      return response
        .status(400)
        .json({ message: err.message })
    }
  }

  async delete(request: Request, response: Response) {
    const bankServices = new BankServices()
    // parametro na rota - request.params
    const { id } = request.params
    // const id = request.params.id

    try {
      const bank = await bankServices.delete({ id })
      return response.json({ message: 'Bank id deleted successfully !!' })
    } catch (err) {
      return response
        .status(400)
        .json({ message: err.message })
    }
  }

  async update(request: Request, response: Response) {
    const { bank_branch, account, cpf, name, salary } = request.body
    const { id } = request.params

    const bankServices = new BankServices()

    try {
      const bank = await bankServices.update({ id, bank_branch, account, cpf, name, salary })
      return response.json(bank)
    } catch (err) {
      return response
        .status(400)
        .json({ message: err.message })
    }
  }
}

export { BankController }

