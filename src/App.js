// import logo from './logo.svg';
// import './App.css';

import { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import BudgetCard from "./components/BudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "./context/BudgetsContext";

function App() {

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()

  const { budgets, expenses, getBudgetExpenses } = useBudgets()
  

  const handleAddBudgetModal = () => {
    setShowAddBudgetModal(true)
  }

  const handleClose = () => {
    setShowAddBudgetModal(false)
    setShowAddExpenseModal(false)
  }

  const handleAddExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <div className="App">
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={ handleAddBudgetModal }>Add Budget</Button>
          <Button variant="outline-primary" onClick={ () => handleAddExpenseModal(UNCATEGORIZED_BUDGET_ID) }>Add Expense</Button>
        </Stack>

        <div style={{ 
          display:"grid", 
          gridTemplateColumns:"repeat(auto-fill), minmax(300px, 1fr)", 
          gap:"1rem", 
          alignItems:"flex-start" 
          }}>
          {
            budgets && budgets.map(budget => {

              const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0) 
              
              return (
                <BudgetCard name={ budget.name } 
                  key={ budget.id }
                  amount={ amount } 
                  max={ budget.max }  
                  handleAddExpenseModal={ () => handleAddExpenseModal(budget.id) }
                />
                )
              })
          }    
          
          <UncategorizedBudgetCard handleAddExpenseModal={ () => handleAddExpenseModal(UNCATEGORIZED_BUDGET_ID) } />
          <TotalBudgetCard />
        </div>

      </Container>

      <AddBudgetModal show={ showAddBudgetModal } handleClose = { handleClose } ></AddBudgetModal>
      <AddExpenseModal show={ showAddExpenseModal } handleClose = { handleClose } defaultBudgetId={ addExpenseModalBudgetId }></AddExpenseModal>

    </div>
  );
}

export default App;
