import { useState } from 'react';
import api from '../services/api';

export default function ExpenseForm({ onSuccess }) {
  const [form, setForm] = useState({
    amount: '',
    category: '',
    description: '',
    date: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post('/expenses', form);

    setForm({
      amount: '',
      category: '',
      description: '',
      date: '',
    });

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
      />
      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input name="date" type="date" value={form.date} onChange={handleChange} required />
      <button type="submit">Add</button>
    </form>
  );
}
