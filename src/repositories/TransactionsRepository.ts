import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface ListAll {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): ListAll {
    const listAll: ListAll = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };

    return listAll;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;

    this.transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        income += transaction.value;
      } else {
        outcome += transaction.value;
      }
    });
    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };
    return balance;
  }

  public create(transaction: Transaction): Transaction {
    const balance: Balance = this.getBalance();
    if (transaction.value > balance.total && transaction.type === 'outcome') {
      throw Error('Valor de retirada maior do que o valor do caixa');
    }
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
