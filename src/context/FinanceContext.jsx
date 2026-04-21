import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reference to the 'transactions' collection in Firestore
    const transactionsRef = collection(db, 'transactions');
    // Query: order by date descending
    const q = query(transactionsRef, orderBy('date', 'desc'));

    // Real-time listener
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setTransactions(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching transactions from Firestore:", error);
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  const addTransaction = async (transaction) => {
    try {
      const newTransaction = {
        ...transaction,
        amount: Number(transaction.amount) // Ensure it's a number
      };
      await addDoc(collection(db, 'transactions'), newTransaction);
    } catch (error) {
      console.error("Error adding transaction: ", error);
      alert("Đã có lỗi xảy ra khi lưu trên đám mây. Vui lòng kiểm tra quyền truy cập (Test mode) của Firestore!");
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await deleteDoc(doc(db, 'transactions', id));
    } catch (error) {
      console.error("Error deleting transaction: ", error);
    }
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
    balance,
    loading
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};
