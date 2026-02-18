import Expense from '../models/Expense.js';

export const createExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    const idempotencyKey = req.headers['idempotency-key'];

    if (!amount || !category || !date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Idempotency handling
    if (idempotencyKey) {
      const existing = await Expense.findOne({ idempotencyKey });
      if (existing) {
        return res.status(200).json(existing);
      }
    }

    const expense = await Expense.create({
      amount,
      category,
      description,
      date,
      idempotencyKey,
    });

    return res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * GET /expenses
 * Supports:
 * ?category=Food
 * ?sort=date_desc
 */
export const getExpenses = async (req, res) => {
  try {
    const { category, sort } = req.query;

    let filter = {};
    if (category) {
      filter.category = category;
    }

    let sortOption = { date: -1 }; // default newest first

    if (sort === 'oldest') {
      sortOption = { date: 1 };
    }

    const expenses = await Expense.find(filter).sort(sortOption);

    res.status(200).json({
      data: expenses,
      total: expenses.reduce((sum, item) => sum + item.amount, 0),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findByIdAndDelete(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

