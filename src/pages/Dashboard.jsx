import { useFinance } from '../context/FinanceContext';
import { IndianRupee, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const Dashboard = () => {
  const { totalIncome, totalExpense, balance, transactions } = useFinance();

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Tổng quan tài chính</h1>
        <p className="page-subtitle">Theo dõi tình hình tài chính gia đình bạn trong tháng này.</p>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-title">Số dư hiện tại</div>
          <div className={`card-value ${balance >= 0 ? 'positive' : 'negative'}`}>
            {formatCurrency(balance)}
          </div>
        </div>
        <div className="card">
          <div className="card-title">Tổng thu</div>
          <div className="card-value positive">
            {formatCurrency(totalIncome)}
          </div>
        </div>
        <div className="card">
          <div className="card-title">Tổng chi</div>
          <div className="card-value negative">
            {formatCurrency(totalExpense)}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Giao dịch gần đây</h2>
        {recentTransactions.length === 0 ? (
          <p className="text-tertiary">Chưa có giao dịch nào.</p>
        ) : (
          <div className="list-container">
            {recentTransactions.map(t => (
              <div key={t.id} className="list-item">
                <div className="list-item-info">
                  <div className="list-item-title">{t.category} - {t.note}</div>
                  <div className="list-item-date">{new Date(t.date).toLocaleDateString('vi-VN')}</div>
                </div>
                <div className={`list-item-amount ${t.type === 'income' ? 'positive' : 'negative'}`}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
