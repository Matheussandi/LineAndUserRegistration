import { getCustomRepository } from 'typeorm'
import { BankRepository } from '../repositories/BankRepository'

interface IBankCreate {
  bank_branch: string;
  account: string;
  cpf: string;
  name: string;
  salary: number;
}

interface IBankShow {
  id: string
}


interface IBankUpdate {
  id: string;
  bank_branch: string;
  account: string;
  cpf: string;
  name: string;
  salary: number;
}

class BankServices {

  async create({ bank_branch, account, cpf, name, salary }: IBankCreate) {

    const bankRepository = getCustomRepository(BankRepository)

    const bank = bankRepository.create({
      bank_branch, 
      account,
      cpf,
      name,
      salary
    })

    await bankRepository.save(bank)

    return bank
  }

  async index() {
    const bankRepository = getCustomRepository(BankRepository)

    const bank = await bankRepository.find()

    return bank;
  }

  //async show({ id: string }) {
  async show({ id }: IBankShow) {
    const bankRepository = getCustomRepository(BankRepository)

    const bank = await bankRepository.findOne({ id })

    console.log(bank)

    if (!bank) {
      throw new Error('Bank id not found!!')
    }

    return bank;
  }

  async delete({ id }: IBankShow) {
    const bankRepository = getCustomRepository(BankRepository)

    const bank = await bankRepository.findOne({ id })

    if (!bank) {
      throw new Error('Bank id not found!!')
    }

    return await bankRepository.delete({ id })
  }

  async update({ id, bank_branch, account, cpf, name, salary }: IBankUpdate) {
    const bankRepository = getCustomRepository(BankRepository)

    let bank = await bankRepository.findOne({ id })

    if (!bank) {
      throw new Error('Bank id not found!!')
    }

    await bankRepository.update(
      { id },
      {
        bank_branch, account, cpf, name, salary
      }
    )

    const bankUpdated = await bankRepository.findOne({ id })

    return bankUpdated
  }
}

export { BankServices }