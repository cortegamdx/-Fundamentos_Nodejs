import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';

import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

transactionRouter.get('/', (request, response) => {
  try {
    return response.json(transactionsRepository.all());
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const transactionDTO: TransactionDTO = request.body;

    const creatTransaction = new CreateTransactionService(
      transactionsRepository,
    );
    const transaction = creatTransaction.execute(transactionDTO);
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
