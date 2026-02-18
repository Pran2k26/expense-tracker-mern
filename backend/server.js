import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import expenseRoutes from './routes/expenseRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', expenseRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.error('DB Error:', err);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import expenseRoutes from './routes/expenseRoutes.js';

// dotenv.config();

// const app = express();
// app.use(express.json());

// // Routes
// app.use('/api/expenses', expenseRoutes);

// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('✅ MongoDB connected');

//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   } catch (err) {
//     console.error('❌ DB connection error:', err);
//   }
// };

// startServer();

//  import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import expenseRoutes from './routes/expenseRoutes.js';

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use('/api/expenses', expenseRoutes);

// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log(" MongoDB Connected");

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });

//   } catch (error) {
//     console.error("Failed to connect to MongoDB");
//     process.exit(1); // IMPORTANT
//   }
// };

// startServer();
