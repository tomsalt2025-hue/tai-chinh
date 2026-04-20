import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Trash2 } from 'lucide-react';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const Expenses = () => {
  const { expenses, addTransaction, deleteTransaction } = useFinance();
  const [formData, setFormData] = useState({ amount: '', category: 'Ăn uống', note: '', date: new Date().toISOString().slice(0, 10) });

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    if (!rawValue) {
      setFormData({ ...formData, amount: '' });
      return;
    }
    const formatted = new Intl.NumberFormat('vi-VN').format(parseInt(rawValue, 10));
    setFormData({ ...formData, amount: formatted });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount) return;

    addTransaction({
      type: 'expense',
      amount: parseInt(formData.amount.replace(/\D/g, ''), 10),
      category: formData.category,
      note: formData.note,
      date: new Date(formData.date).toISOString()
    });

    setFormData({ amount: '', category: 'Ăn uống', note: '', date: new Date().toISOString().slice(0, 10) });
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Khoản Chi</h1>
        <p className="page-subtitle">Theo dõi và quản lý các khoản chi tiêu.</p>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 className="card-title" style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Thêm khoản chi mới</h2>
        <form onSubmit={handleSubmit}>
          <div className="dashboard-grid" style={{ marginBottom: '0' }}>
            <div className="form-group">
              <label className="form-label">Số tiền (VND)</label>
              <input type="text" className="form-input" required value={formData.amount} onChange={handleAmountChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Ngày</label>
              <input type="date" className="form-input" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Danh mục</label>
              <select className="form-input" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                <option value="Ăn uống">Ăn uống</option>
                <option value="Sinh hoạt">Sinh hoạt (Điện/Nước)</option>
                <option value="Nhà cửa">Nhà cửa/Thuê nhà</option>
                <option value="Đi lại">Đi lại</option>
                <option value="Giáo dục">Giáo dục</option>
                <option value="Sức khỏe">Sức khỏe</option>
                <option value="Giải trí">Giải trí</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Ghi chú</label>
            <input type="text" className="form-input" placeholder="Ví dụ: Tiền chợ tuần 1" value={formData.note} onChange={(e) => setFormData({ ...formData, note: e.target.value })} />
          </div>
          <button type="submit" className="btn btn-danger">Thêm Khoản Chi</button>
        </form>
      </div>

      <div className="card">
        <h2 className="card-title" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Lịch sử chi tiêu</h2>
        <div className="list-container">
          {expenses.map(t => (
            <div key={t.id} className="list-item">
              <div className="list-item-info">
                <div className="list-item-title">{t.category} {t.note && `- ${t.note}`}</div>
                <div className="list-item-date">{new Date(t.date).toLocaleDateString('vi-VN')}</div>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <div className="list-item-amount negative">-{formatCurrency(t.amount)}</div>
                <button className="btn btn-danger" style={{padding: '0.5rem'}} onClick={() => deleteTransaction(t.id)} title="Xóa">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {expenses.length === 0 && <p className="text-tertiary">Chưa có khoản chi nào.</p>}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
