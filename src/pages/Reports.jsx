import { useFinance } from '../context/FinanceContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#64748b'];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#2a2a2a', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '8px' }}>
        <p style={{ color: '#fff' }}>{`${payload[0].name} : ${formatCurrency(payload[0].value)}`}</p>
      </div>
    );
  }
  return null;
};

const Reports = () => {
  const { incomes, expenses } = useFinance();

  // Aggregate expenses by category
  const expensesByCategory = expenses.reduce((acc, current) => {
    const existing = acc.find(item => item.name === current.category);
    if (existing) existing.value += current.amount;
    else acc.push({ name: current.category, value: current.amount });
    return acc;
  }, []);
  expensesByCategory.sort((a, b) => b.value - a.value);

  // Aggregate incomes by category
  const incomesByCategory = incomes.reduce((acc, current) => {
    const existing = acc.find(item => item.name === current.category);
    if (existing) existing.value += current.amount;
    else acc.push({ name: current.category, value: current.amount });
    return acc;
  }, []);
  incomesByCategory.sort((a, b) => b.value - a.value);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Báo Cáo Phân Tích</h1>
        <p className="page-subtitle">Nhìn nhận biểu đồ tổng quan về tài chính của bạn.</p>
      </div>

      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Cơ cấu Thu Nhập</h2>
      <div className="dashboard-grid">
        <div className="card" style={{ gridColumn: 'span 1' }}>
          <h2 className="card-title" style={{ fontSize: '1rem', marginBottom: '1.5rem', textAlign: 'center' }}>Biểu đồ thu nhập</h2>
          {incomes.length > 0 ? (
            <div style={{ height: 300, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={incomesByCategory} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                    {incomesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
             <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)' }}>Chưa có dữ liệu thu nhập</div>
          )}
        </div>

        <div className="card" style={{ gridColumn: 'span 1' }}>
          <h2 className="card-title" style={{ fontSize: '1rem', marginBottom: '1rem' }}>Chi tiết thu nhập</h2>
          <div className="list-container">
            {incomesByCategory.map((item, index) => (
              <div key={item.name} className="list-item" style={{ borderLeft: `4px solid ${COLORS[index % COLORS.length]}` }}>
                <div className="list-item-title">{item.name}</div>
                <div className="list-item-amount positive">+{formatCurrency(item.value)}</div>
              </div>
            ))}
             {incomesByCategory.length === 0 && <p className="text-tertiary">Chưa có khoản thu nào.</p>}
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '1rem' }}>Cơ cấu Chi Tiêu</h2>
      <div className="dashboard-grid">
        <div className="card" style={{ gridColumn: 'span 1' }}>
          <h2 className="card-title" style={{ fontSize: '1rem', marginBottom: '1.5rem', textAlign: 'center' }}>Biểu đồ chi tiêu</h2>
          {expenses.length > 0 ? (
            <div style={{ height: 300, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={expensesByCategory} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                    {expensesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)' }}>Chưa có dữ liệu chi tiêu</div>
          )}
        </div>

        <div className="card" style={{ gridColumn: 'span 1' }}>
          <h2 className="card-title" style={{ fontSize: '1rem', marginBottom: '1rem' }}>Chi tiết chi tiêu</h2>
          <div className="list-container">
            {expensesByCategory.map((item, index) => (
              <div key={item.name} className="list-item" style={{ borderLeft: `4px solid ${COLORS[index % COLORS.length]}` }}>
                <div className="list-item-title">{item.name}</div>
                <div className="list-item-amount negative">-{formatCurrency(item.value)}</div>
              </div>
            ))}
             {expensesByCategory.length === 0 && <p className="text-tertiary">Chưa có khoản chi nào.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
