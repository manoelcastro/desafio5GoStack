import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeValues = this.transactions.reduce((soma, transaction) => {
      if (transaction.type === 'income') {
        return soma + transaction.value;
      }
      return soma;
    }, 0);

    const outcomeValues = this.transactions.reduce((soma, transaction) => {
      if (transaction.type === 'outcome') {
        return soma + transaction.value;
      }
      return soma;
    }, 0);
    const sub = incomeValues - outcomeValues;

    const balance: Balance = {
      income: incomeValues,
      outcome: outcomeValues,
      total: sub,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
