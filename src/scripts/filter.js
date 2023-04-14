import { cashFlowUpdate, totalValue, removeCashFlowItem } from "./cashFlow.js"
import { insertedValues } from "./valuesData.js"


export function filterValues() {
    const allFilterBtn = document.querySelector('.all-filters')
    const entryCategoryBtn = document.querySelectorAll('.entry-category')
    const expensesCategoryBtn = document.querySelectorAll('.expenses-category')
    const list = document.querySelector('.cash-flow__list')
  
    allFilterBtn.addEventListener('click', () => {
      let filteredValues = insertedValues
      list.innerHTML = ''
      cashFlowUpdate(filteredValues)
      totalValue(filteredValues)
      removeCashFlowItem(filteredValues, insertedValues)
    })
    
    entryCategoryBtn.forEach(btnEntry => {
      btnEntry.addEventListener('click', () => {
        const filteredValues = insertedValues.filter(value => value.categoryID === 0)

        list.innerHTML = ''
        cashFlowUpdate(filteredValues)
        totalValue(filteredValues)
        removeCashFlowItem(filteredValues, insertedValues)
     
      })
    })
  
    expensesCategoryBtn.forEach(btn => {
      btn.addEventListener('click', () => {
        const filteredValues = insertedValues.filter(value => value.categoryID === 1)
        list.innerHTML = ''
        cashFlowUpdate(filteredValues)
        totalValue(filteredValues)
        removeCashFlowItem(filteredValues, insertedValues)
    
      })
    })
  }
  
