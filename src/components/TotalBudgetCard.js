import BudgetCard from "./BudgetCard"
import { useBudgets } from '../context/BudgetsContext'

const TotalBudgetCard = () => {

    const { budgets, expenses } = useBudgets()

    const totalBudgets = budgets.reduce((total, budget) => total + budget.max, 0)
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0)

    return (
        <BudgetCard name="Total" amount={ totalExpenses } max={ totalBudgets } hideButtons />
    )

}

export default TotalBudgetCard