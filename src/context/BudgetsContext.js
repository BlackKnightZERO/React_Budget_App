import React, { useContext } from 'react';

const BudgetsContext = React.createContext();

export function useBudgets() {
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {

    const budgets = []
    const expenses = []

    const getBudgetExpenses = () => {

    }
    const addExpense = () => {

    }
    const addBudget = () => {

    }
    const deleteBudget = () => {

    }
    const deleteExpense = () => {
        
    }

    return <BudgetsContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense
    }}>{children}</BudgetsContext.Provider>
}