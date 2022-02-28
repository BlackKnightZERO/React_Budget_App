import BudgetCard from "./BudgetCard"
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from '../context/BudgetsContext'

const UncategorizedBudgetCard = (props) => {
    
    const { getBudgetExpenses } = useBudgets()
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((total, expense) => total + expense.amount, 0)
    
    if(amount===0) return null

    return (
        <BudgetCard name="Uncategorized" amount={ amount } gray {...props} />
    )
}

export default UncategorizedBudgetCard