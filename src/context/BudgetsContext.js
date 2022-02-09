import React, { useContext } from 'react';
import { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

const BudgetsContext = React.createContext();

export const useBudgets = () => {
    return useContext(BudgetsContext)
}

// {
//     id:,
//     name:,
//     max:
// }
// {
//     id:,
//     budgetId:,
//     amount:,
//     description:
// }

export const BudgetsProvider = ({ children }) => {

    const [budgets, setBudgets] = useState([])
    const [expenses, setExpenses] = useState([])

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