/**
 * This function adds a temporary animation effect to buttons simulating
 * the addition of a product to a shopping cart. It targets two specific
 * button classes:
 * 
 * - `.button-detail`: Presumably buttons within a product modal window.
 * - `.button-product`: Presumably buttons displayed alongside product listings.
 * 
 * @param {Event} e The event object triggered by a click on a button. 
 * @returns {void}
 * 
 * @author Nycolas Felipe
 */

const addCartAnimation = (e) => {
  // Botão de compra do modal
  if (e.target.classList.contains("button-detail")) {
    e.target.classList.add("confirmation");
    e.target.innerText = "Produto adicionado ✓";
    setTimeout(() => {
      e.target.innerText = "Adicionar ao carrinho";
      e.target.classList.remove("confirmation");
    }, 2000);
    return;
  }

  // Botão de compra ao lado do produto
  if (e.target.classList.contains("button-product")) {
    e.target.classList.add("confirmation");
    setTimeout(() => {
      e.target.classList.remove("confirmation");
    }, 2000);
    return;
  }
}

export default addCartAnimation;