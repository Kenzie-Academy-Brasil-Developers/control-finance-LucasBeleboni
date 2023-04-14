import { insertModal} from "./modal.js";
import { cashFlowUpdate, removeCashFlowItem } from "./cashFlow.js";
import {totalValue } from "./cashFlow.js"
import { insertedValues } from "./valuesData.js";
import { filterValues } from "./filter.js";
import { createEmptyState, emptyVerify } from "./empty-display.js";

init()

function init(){   
    loadFromLocalStorage()
    emptyVerify()
    insertModal()   
    cashFlowUpdate(insertedValues)
    totalValue(insertedValues)
    removeCashFlowItem(insertedValues)
    createEmptyState()
    filterValues() 
}

function loadFromLocalStorage() {
    const arrayCopy = JSON.parse(localStorage.getItem('insertedValues'));
    if (arrayCopy) {
      insertedValues.push(...arrayCopy);
  }
}