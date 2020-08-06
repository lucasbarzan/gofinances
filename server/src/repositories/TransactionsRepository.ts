import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const income = transactions.reduce((accumulator, transaction) => {
      const valueIfIncome =
        transaction.type === 'income' ? transaction.value : 0;
      return accumulator + valueIfIncome;
    }, 0);

    const outcome = transactions.reduce((accumulator, transaction) => {
      const valueIfIncome =
        transaction.type === 'outcome' ? transaction.value : 0;
      return accumulator + valueIfIncome;
    }, 0);

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }
}

export default TransactionsRepository;
