import { Repository, EntityRepository } from 'typeorm'
import { Bank } from '../entities/Bank'

@EntityRepository(Bank)
class BankRepository extends Repository<Bank> {

}

export { BankRepository }

