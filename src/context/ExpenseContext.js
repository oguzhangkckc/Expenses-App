import { createContext } from "react";
import { useReducer } from "react";

export const ExpenseContext = createContext();

export const ExpenseReducer = (state, action) => {
  switch (action.type) {
    case "GET_EXPENSES":
      return { ...state, expenses: action.payload };

    case "ADD_EXPENSE":
      return { ...state, expenses: [...state.expenses, action.payload] };

    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense._id !== action.payload
        ),
      };

    case "UPDATE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense._id === action.payload._id ? action.payload : expense
        ),
      };

    default:
      return state;
  }
};

export const ExpenseContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ExpenseReducer, { expenses: [] });

  return (
    <ExpenseContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};
