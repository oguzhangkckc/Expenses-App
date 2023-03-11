import React from "react";
import AppNav from "./src/Navigation/AppNav";
import { AuthContextProvider } from "./src/context/AuthContext";
import { ExpenseContextProvider } from "./src/context/ExpenseContext";

export default function App() {
  return (
    <AuthContextProvider>
      <ExpenseContextProvider>
      <AppNav />
      </ExpenseContextProvider>
    </AuthContextProvider>
  );
}