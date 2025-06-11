import React, { useEffect, useState } from 'react';
import ForgeReconciler, {Button, DynamicTable, Inline, Text, Textfield} from '@forge/react';
import { invoke } from '@forge/bridge';
import { conferenceExpenses } from './data';

const App = () => {
  const [data, setData] = useState(null);
  const [expensesArray, setExpensesArray] = useState(null);

  useEffect(() => {
    invoke('get-all').then(setExpensesArray);
  }, []);

  let expenseDescriptionValue = null;
  let expenseAmountValue = null;
  
  useEffect(() => {
    console.log("Stored expenses for this issue: ")
    console.log(expensesArray)
  }, [expensesArray]);
  
  const create = (data) => {
    console.log(expenseDescriptionValue)
    console.log(expenseAmountValue)
    invoke('create', {data: data,expenseDescription: expenseDescriptionValue, expenseAmount: expenseAmountValue}).then(setData);
  }

  const validate = (data) => {
    console.log(data)
    if(data.target.id === "expense-description") expenseDescriptionValue = data.target.value;
    if(data.target.id === "expense-amount") expenseAmountValue = data.target.value;
  }

  const inputRow = ({
    cells: [
      {
        content: <Textfield appearance="subtle"  spacing="compact" id="expense-description" placeholder="Add an expense +" onBlur={validate}/>,
      },
      {
        content: <Textfield appearance="subtle"  spacing="compact" id="expense-amount" placeholder="0" onBlur={validate}/>,
      },
      {
        content: <Button appearance="subtle" spacing="compact" id="add-expense" onClick={create}>Add</Button>,
      },
    ],
  })

  const fillTable = ( expenses ) => {
    console.log(expenses)
    if (expenses.length > 0) {
      const rows = expenses.map((item) => ({
        cells: [
          {
            content: <Textfield appearance="subtle"  spacing="compact" id="expense-description" defaultValue={item.description}/>,
          },
          {
            content:  <Textfield appearance="subtle"  spacing="compact" id="expense-amount" defaultValue={item.amount}/>,
          },
          { 
            content: <Button appearance="subtle" iconBefore="trash" spacing="compact"/>
          },
        ],
      }))
      rows.push(inputRow)
      return rows;
    }
    else return [inputRow];
  }

  const getTotal = (expenses) => {
    let total = 0;
    expenses.forEach(expense => {
      total += expense.amount;
    });
    return total;
  }

  return (
    <>
      <DynamicTable 
        caption="Expenses"
        rows={fillTable(conferenceExpenses)} />
      <Inline spread='space-between'>
        <Text>Total:  ${getTotal(conferenceExpenses)}</Text>
        <Button>Delete All</Button>
      </Inline>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
