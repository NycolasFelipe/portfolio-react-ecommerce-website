function addCartAnimation(e) {
  //Botão de compra do modal
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