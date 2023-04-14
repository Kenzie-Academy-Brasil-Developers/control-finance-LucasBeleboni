import { cashFlowUpdate, totalValue } from "./cashFlow.js"
import { emptyVerify } from "./empty-display.js"
import { insertedValues } from "./valuesData.js"

export function insertModal() {
  const dialog = document.getElementById("modal")
  const actionButton = document.querySelector(".new-value-button")
  actionButton.addEventListener("click", () => {
    renderModal()
    formatInputValue()
    const btnCloseModal = document.querySelector(".modal__button-close")
    btnCloseModal.addEventListener("click", () => {
      dialog.close()
    })
  })
}

export function formatInputValue() {
  const input = document.getElementById("input-value")

  input.addEventListener("keyup", (event) => {
    const value = event.target.value.replace(/\D/g, "")
    const formattedValue = parseFloat(value / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

    if (formattedValue !== "NaN") {
      event.target.value = formattedValue
    } else {
      event.target.value = ""
    }
  })

}

export function renderModal() {
  // Cria os elementos do modal
  const modal = document.querySelector(".modal")
  modal.innerHTML = ""
  const container = document.createElement('div')
  container.setAttribute('class', 'modal__container')

  const header = document.createElement('div')
  header.setAttribute('class', 'modal__header')

  const title = document.createElement('h2')
  title.setAttribute('class', 'modal__title title2-bold')
  title.textContent = 'Registro de valor'

  const closeButton = document.createElement('button')
  closeButton.setAttribute('class', 'modal__button-close')
  closeButton.textContent = 'X'

  const paragraph = document.createElement('p')
  paragraph.setAttribute('class', 'modal__paragraph text1-regular')
  paragraph.textContent = 'Digite o valor e em seguida aperte no botão referente ao tipo do valor'

  const form = document.createElement('form')
  form.setAttribute('class', 'modal__form')

  const labelValue = document.createElement('label')
  labelValue.setAttribute('for', 'input-value')
  labelValue.setAttribute('class', 'modal__label-value text1-medium')
  labelValue.textContent = 'Valor'

  const inputValue = document.createElement('input')
  inputValue.setAttribute('type', 'text')
  inputValue.setAttribute('name', 'input-value')
  inputValue.setAttribute('id', 'input-value')
  inputValue.setAttribute('class', 'modal__form-value-input text1-regular')
  inputValue.setAttribute('placeholder', 'R$ 00,00')

  const selectTypeDiv = document.createElement('div')
  selectTypeDiv.setAttribute('class', 'modal__select-type-div')

  const selectTypeTitle = document.createElement('h3')
  selectTypeTitle.setAttribute('class', 'modal__select-type-title text1-medium')
  selectTypeTitle.textContent = 'Tipo de Valor'

  // Cria o input radio para tipo "Entrada"
  const selectTypeEntryLabel = document.createElement('label')
  selectTypeEntryLabel.setAttribute('for', 'select-type-entry')
  selectTypeEntryLabel.setAttribute('class', 'modal__select-type text1-bold entry')
  selectTypeEntryLabel.textContent = 'Entrada'
  selectTypeEntryLabel.setAttribute("tabindex", "0")

  const selectTypeEntryInput = document.createElement('input')
  selectTypeEntryInput.setAttribute('type', 'radio')
  selectTypeEntryInput.setAttribute('id', 'select-type-entry')
  selectTypeEntryInput.setAttribute('name', 'value-type')
  selectTypeEntryInput.setAttribute('value', '0')
  selectTypeEntryInput.setAttribute('hidden', '')
  selectTypeEntryLabel.appendChild(selectTypeEntryInput)

  // Cria o input radio para tipo "Saída"
  const selectTypeExpensesLabel = document.createElement('label')
  selectTypeExpensesLabel.setAttribute('for', 'select-type-expenses')
  selectTypeExpensesLabel.setAttribute('class', 'modal__select-type text1-bold label-expenses')
  selectTypeExpensesLabel.textContent = 'Saída'
  selectTypeExpensesLabel.setAttribute("tabindex", "0")
  const selectTypeExpensesInput = document.createElement('input')
  selectTypeExpensesInput.setAttribute('type', 'radio')
  selectTypeExpensesInput.setAttribute('id', 'select-type-expenses')
  selectTypeExpensesInput.setAttribute('name', 'value-type')
  selectTypeExpensesInput.setAttribute('value', '1')
  selectTypeExpensesInput.setAttribute('hidden', '')
  selectTypeExpensesLabel.appendChild(selectTypeExpensesInput)


  // Cria o container de botões
  const buttonsContainer = document.createElement('div')
  buttonsContainer.classList.add('modal__buttons-container')

  // Cria o botão de cancelar
  const cancelButton = document.createElement('button')
  cancelButton.classList.add('modal__button-cancel', 'text1-bold')
  cancelButton.textContent = 'Cancelar'
  cancelButton.addEventListener("click", () => modal.close())

  // Cria o botão de inserir valor
  const insertValueButton = document.createElement('button')
  insertValueButton.classList.add('modal__button-insert', 'text1-bold')
  insertValueButton.setAttribute('id', 'modal-add-value')
  insertValueButton.setAttribute('type', 'button')
  insertValueButton.textContent = 'Inserir Valor'

  // Adiciona os botões ao container
  buttonsContainer.appendChild(cancelButton)
  buttonsContainer.appendChild(insertValueButton)
  // Adiciona o título e o botão de fechar ao header
  header.appendChild(title)
  header.appendChild(closeButton)

  // Adiciona o label e o input do valor ao form
  form.appendChild(labelValue)
  form.appendChild(inputValue)

  // Adiciona os inputs radio ao div do tipo de valor
  selectTypeDiv.appendChild(selectTypeTitle)
  selectTypeDiv.appendChild(selectTypeEntryLabel)
  selectTypeDiv.appendChild(selectTypeExpensesLabel)

  // Adiciona o header, parágrafo, form e div do tipo de valor ao container
  container.appendChild(header)
  container.appendChild(paragraph)
  container.appendChild(form)
  container.appendChild(selectTypeDiv)

  // Adiciona o container de botões ao container
  container.appendChild(buttonsContainer)

  // Adiciona o container ao modal
  modal.appendChild(container)

  insertValue(modal)

  closeButton.addEventListener("click", () => {
    modal.close()
  } )
  
  modal.showModal()

}

function insertValue(modal) {
  const insertValuesButton = document.getElementById("modal-add-value")
  const expensesInput = document.getElementById("select-type-expenses")
  const entryInput = document.getElementById("select-type-entry")

  insertValuesButton.addEventListener("click", () => {

    const valueInput = document.getElementById("input-value").value

    const decimalSeparator = (1.1).toLocaleString(navigator.language).substring(1, 2)
    const valueString = valueInput.replace("R$", "").replace(".", "").replace(",", decimalSeparator)
    const value = parseFloat(valueString.replace(",", "."))
    const type = entryInput.checked ? 0 : expensesInput.checked ? 1 : ""

    if (isNaN(value)) {
      console.log(value)
      alert("Digite o valor que deseja incluir na movimentação")
      return
    }

    if (type === "") {
      alert("Selecione o Tipo de valor (Entrada ou Saída)")
      return
    }

    const toInsert = {
      id: insertedValues.length + 1,
      value,
      categoryID: type,
    }

    insertedValues.unshift(toInsert)

    saveToLocalStorage(insertedValues)

    emptyVerify()
    cashFlowUpdate(insertedValues)
    totalValue(insertedValues)



    modal.close()


  })
}
export function saveToLocalStorage(array) {
  const arrayCopy = [...array]; 
  localStorage.setItem('insertedValues', JSON.stringify(arrayCopy)); 
}