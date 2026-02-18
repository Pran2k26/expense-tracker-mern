import { useEffect, useState } from "react";
import api from "../services/api";

export default function ExpenseList({ refresh }) {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");

  const fetchExpenses = async () => {
    const res = await api.get("/expenses", {
      params: {
        category,
        sort,
      },
    });

    setExpenses(res.data.data);
  };

  const handleDelete = async (id) => {
    await api.delete(`/expenses/${id}`);
    fetchExpenses();
  };

  useEffect(() => {
    fetchExpenses();
  }, [refresh, category, sort]);

  return (
    <div>
      <h2>Expenses</h2>

      {/* FILTER + SORT CONTROLS */}
      <div style={{ marginBottom: "15px" }}>
        <input
          placeholder="Filter by category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <ul>
        {expenses.map((expense) => (
          <li key={expense._id} style={{ marginBottom: "10px" }}>
            <strong>₹{expense.amount}</strong> | {expense.category} |{" "}
            {new Date(expense.date).toLocaleDateString()}
            <div>{expense.description}</div>

            <button
              onClick={() => handleDelete(expense._id)}
              style={{ marginTop: "5px", background: "red", color: "white" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// import { useEffect, useState } from 'react';
// import api from '../services/api';

// export default function ExpenseList({ refresh }) {
//   const [expenses, setExpenses] = useState([]);

//   const fetchExpenses = async () => {
//     const res = await api.get('/expenses');
//     setExpenses(res.data.data);
//   };

//   const handleDelete = async (id) => {
//     await api.delete(`/expenses/${id}`);
//     fetchExpenses();
//   };

//   useEffect(() => {
//     fetchExpenses();
//   }, [refresh]);

//   return (
//     <ul>
//       {expenses.map((expense) => (
//         <li key={expense._id} style={{ marginBottom: '10px' }}>
//           <strong>₹{expense.amount}</strong> | {expense.category} |{' '}
//           {new Date(expense.date).toLocaleDateString()}
//           <div>{expense.description}</div>
//           <button
//             onClick={() => handleDelete(expense._id)}
//             style={{ marginTop: '5px', background: 'red', color: 'white' }}
//           >
//             Delete
//           </button>
//         </li>
//       ))}
//     </ul>
//   );
// }

// // import { useEffect, useState } from 'react';
// // import api from '../services/api';

// // export default function ExpenseList({ refresh }) {
// //   const [expenses, setExpenses] = useState([]);

// //   const fetchExpenses = async () => {
// //     const res = await api.get('/expenses');
// //     setExpenses(res.data.data);
// //   };

// //   useEffect(() => {
// //     fetchExpenses();
// //   }, [refresh]);

// //   return (
// //     <ul>
// //       {expenses.map((expense) => (
// //         <li key={expense._id}>
// //           ₹{expense.amount} - {expense.category}
// //         </li>
// //       ))}
// //     </ul>
// //   );
// // }
