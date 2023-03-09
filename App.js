import React from "react";
import AppNav from "./Navigation/AppNav";
import { AuthContextProvider } from "./context/AuthContext";
import { ExpenseContextProvider } from "./context/ExpenseContext";

export default function App() {
  return (
    <AuthContextProvider>
      <ExpenseContextProvider>
      <AppNav />
      </ExpenseContextProvider>
    </AuthContextProvider>
  );
}