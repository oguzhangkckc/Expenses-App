import React from "react";
import AppNav from "./Navigation/AppNav";
import { AuthContextProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthContextProvider>
      <AppNav />
    </AuthContextProvider>
  );
}