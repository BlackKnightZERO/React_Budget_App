import React, { useContext } from 'react';
import { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';

const BudgetsContext = React.createContext();

export const useBudgets = () => {
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {

    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])

    const getBudgetExpenses = ( budgetId ) => {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    const addExpense = ({ budgetId, amount, description }) => {

        let newExpense = {
            id: uuidV4(),
            budgetId,
            amount,
            description
        }

        setExpenses(prevExpenses => {
            return [...prevExpenses, newExpense]
        })

    }

    const addBudget = ( name, max ) => {

        let newBudget = {
            id: uuidV4(),
            name,
            max
        }

        setBudgets(prevBudgets => {
            if(prevBudgets.find(budget => budget.name === name)) return prevBudgets
            return [...prevBudgets, newBudget]
        })

    }

    const deleteBudget = ({ id }) => {
        // implement uncategorized expenses
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }

    const deleteExpense = ({ id }) => {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
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