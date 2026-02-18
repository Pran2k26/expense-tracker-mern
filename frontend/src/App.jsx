import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

export default function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "green" }}>Expense Tracker</h1>
      <ExpenseForm onSuccess={() => setRefresh(!refresh)} />
      <ExpenseList refresh={refresh} />
    </div>
  );
}
