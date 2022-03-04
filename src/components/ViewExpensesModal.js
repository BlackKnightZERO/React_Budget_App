import { Modal, Button, Stack } from "react-bootstrap"
import { useRef } from "react"
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../context/BudgetsContext"
import { currencyFormatter } from "../utils"

const ViewExpensesModal = ({ budgetId, handleClose }) => {

    const { budgets, getBudgetExpenses, deleteBudget, deleteExpense } = useBudgets()

    const expenses = getBudgetExpenses(budgetId)

    const budget = budgetId === UNCATEGORIZED_BUDGET_ID
                    ? { name: "Uncategorized", id : UNCATEGORIZED_BUDGET_ID }
                    : budgets.find(budget => budget.id === budgetId )

    return (
        <>
        <Modal show={ budgetId } onHide={ handleClose }>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Stack direction="horizontal" gap="2">
                        <div>Expenses - {budget?.name}</div>
                        { budgetId !== UNCATEGORIZED_BUDGET_ID && (
                            <Button 
                                onClick={ () => {
                                    deleteBudget(budget)
                                    handleClose()
                                }} 
                                variant="outline-danger">Delete</Button>
                        )}
                        </Stack>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Stack direction="vertical" gap="3" >
                        { expenses && expenses.map(expense => (
                            <Stack direction="horizontal" gap="2" key={ expense.id } >
                                <div className="me-auto fs-4">{ expense.description }</div>
                                <div className="fs-5">{ currencyFormatter.format(expense.amount) }</div>
                                <Button onClick={ () => {
                                    deleteExpense(expense)
                                }} size="sm" variant="outline-danger">&times;</Button>
                            </Stack>
                        )) }
                    </Stack>

                </Modal.Body>
        </Modal>
        </>
    )
}

export default ViewExpensesModal