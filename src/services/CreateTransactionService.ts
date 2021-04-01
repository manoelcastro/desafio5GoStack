import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (!(title && value && type)) {
      throw Error('Você precisa preencher todos os valores');
    }

    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      if (value > balance.total) {
        throw Error(
          'Você não possui saldo suficiente para realizar essa transação',
        );
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;