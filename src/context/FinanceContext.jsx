import React, { createContext, useContext, useState, useEffect } from 'react';

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('family_finance_data');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      // Mock data
      { id: '1', type: 'income', amount: 20000000, category: 'Lương', date: new Date().toISOString(), note: 'Lương tháng này' },
      { id: '2', type: 'expense', amount: 5000000, category: 'Sinh hoạt', date: new Date(Date.now() - 86400000).toISOString(), note: 'Tiền chợ' },
      { id: '3', type: 'expense', amount: 1500000, category: 'Hoá đơn', date: new Date(Date.now() - 86400000 * 2).toISOString(), note: 'Tiền điện nước' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('family_finance_data', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      amount: Number(transaction.amount) // Ensure it's a number
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const incomes = transactions.filter(t => t.type === 'income');
  const expenses = transactions.filter(t => t.type === 'expense');

  const totalIncome = incomes.reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const value = {
    transactions,
    addTransaction,
    deleteTransaction,
    incomes,
    expenses,
    totalIncome,
    totalExpense,
    balance
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};
