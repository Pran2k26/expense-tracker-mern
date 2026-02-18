import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number, // for real apps: Decimal128
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    idempotencyKey: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: false },
  },
);

// Indexes for performance
expenseSchema.index({ date: -1 });
expenseSchema.index({ category: 1 });

export default mongoose.model('Expense', expenseSchema);
