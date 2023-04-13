import { emptyVerify } from "./empty-display.js";
import { insertedValues } from "./valuesData.js";



export function cashFlowUpdate(array) {
  //Selecionando a ul
  const cashFlowList = document.querySelector(".cash-flow__list")
  cashFlowList.innerHTML = ""
  array.forEach(flow => {

    // Criar um elemento li
    const li = document.createElement('li')
    li.classList.add('cash-flow__item')

    // Criar um elemento span para o valor
    const spanValue = document.createElement('span')
    spanValue.classList.add('cash-flow__value', 'text1-medium')
    spanValue.textContent = 'R$ ' + flow.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    // Criar um elemento div para os botões
    const divButtonsContainer = document.createElement('div')
    divButtonsContainer.classList.add('cash-flow__buttons-container')

    // Criar um elemento botão para a categoria
    const buttonCategory = document.createElement('button')
    buttonCategory.classList.add('cash-flow__category', 'text2-regular')
    buttonCategory.textContent = flow.categoryID === 0 ? 'Entrada' : 'Saída'
    buttonCategory.textContent === "Entrada" ? buttonCategory.classList.add("entry-category") : buttonCategory.textContent === "Saída" ? buttonCategory.classList.add("expenses-category") : ""


    // Criar um elemento botão para deletar
    const buttonDelete = document.createElement('button')
    buttonDelete.classList.add('cash-flow__delete', "delete-button")
    const iconDelete = document.createElement('i')
    iconDelete.classList.add('fa-solid', 'fa-trash', "delete-button")
    buttonDelete.appendChild(iconDelete)
    buttonDelete.addEventListener("click", (e) => {
      const item = e.target.closest(".cash-flow__item");
      if (item !== null && item.parentElement !== null) { // adiciona verificação para item
        const index = Array.from(item.parentElement.children).indexOf(item);
        insertedValues.splice(index, 1);
      }

      item.remove();
      totalValue(insertedValues);
      emptyVerify()

    })
    iconDelete.addEventListener("click", (e) => {
      const item = e.target.closest(".cash-flow__item");
      if (item !== null && item.parentElement !== null) { // adiciona verificação para item
        const index = Array.from(item.parentElement.children).indexOf(item);
        insertedValues.splice(index, 1);
      }
      item.remove();
      totalValue(insertedValues)
      emptyVerify()

    })

    // Adicionar os botões no div dos botões
    divButtonsContainer.appendChild(buttonCategory)
    divButtonsContainer.appendChild(buttonDelete)

    // Adicionar os elementos no li
    li.appendChild(spanValue)
    li.appendChild(divButtonsContainer)
    cashFlowList.appendChild(li)

  })
}


export function totalValue(array) {

  const total = array.reduce((total, { value }) => total + value, 0)
  const formattedTotal = total.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
  const span = document.querySelector(".total-values__sum")
  span.textContent = formattedTotal
}
export function removeCashFlowItem(array, insertedValues) {
  const deleteButton = document.querySelectorAll(".delete-button");
  deleteButton.forEach((btn) => {
    totalValue(array)
    btn.addEventListener("click", (e) => {
      const item = e.target.closest(".cash-flow__item");
      if (item !== null && item.parentElement !== null) { // adiciona verificação para item
        const index = Array.from(item.parentElement.children).indexOf(item);
        array.splice(index, 1);

        if (insertedValues) {
          const itemToRemove = insertedValues.find((value) => value.id === Number(item.dataset.id));
          const indexInserted = insertedValues.indexOf(itemToRemove);
          insertedValues.splice(indexInserted, 1);

        }
        item.remove();


        emptyVerify()
        totalValue(array);


      }
    });
  });
}
