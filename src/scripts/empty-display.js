import { formatInputValue, renderModal } from "./modal.js";
import { insertedValues } from "./valuesData.js";

export function createEmptyState() {
  const emptyDiv = document.createElement('div')
  emptyDiv.classList.add('empty-state')

  const title = document.createElement('h2')
  title.classList.add('title2-bold', "empty-div__h2")
  title.textContent = 'Nenhum valor cadastrado'

  const button = document.createElement('button')
  button.classList.add('text1-medium')
  button.classList.add('button-register')
  button.textContent = 'Registrar novo valor'
  button.addEventListener('click', () => {
    renderModal()
    formatInputValue()
  })

  emptyDiv.appendChild(title)
  emptyDiv.appendChild(button)

  const emptyContainer = document.getElementById('empty-display')
  emptyContainer.appendChild(emptyDiv)
}
export function emptyVerify() {
  const section = document.getElementById("empty-display")
  if (insertedValues.length === 0) {
    section.classList.remove("hidden")
  } else {
    section.classList.add("hidden")
  }
}