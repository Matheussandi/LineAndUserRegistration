import { Entity, CreateDateColumn, UpdateDateColumn, PrimaryColumn, Column } from 'typeorm'

import { v4 as uuid } from 'uuid' // identificador universal unico

@Entity('bank')
class Bank {

  @PrimaryColumn()
  id: string;

  @Column()
  bank_branch: string;

  @Column()
  account: string;

  @Column()
  cpf: string;

  @Column()
  name: string;

  
  @Column()
  salary: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Bank }
