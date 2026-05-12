// ============================================================
// PRODUTOS - Dados dos Action Figures
// ============================================================
const produtos = [
  {
    id: 1,
    nome: "Naruto Uzumaki",
    descricao: "Action Figure articulado do Naruto clássico com uniforme laranja icônico e detalhes realistas.",
    preco: 189.90,
    imagem: "/assets/img/naruto.jpg",
    emoji: "🍥"
  },
  {
    id: 2,
    nome: "Sasuke Uchiha",
    descricao: "Figura do Sasuke em pose de batalha utilizando o Sharingan com efeito especial giratório.",
    preco: 219.90,
    imagem: "/assets/img/sasuke.jpg",
    emoji: "⚡"
  },
  {
    id: 3,
    nome: "Eren Yeager",
    descricao: "Action Figure premium do Eren Yeager com equipamento tridimensional e espadas da Tropa de Exploração.",
    preco: 279.90,
    imagem: "/assets/img/eren.jpg",
    emoji: "🛡️"
  },
  {
    id: 4,
    nome: "Itachi Uchiha",
    descricao: "Figura colecionável do Itachi com manto Akatsuki, corvos detalhados e base temática exclusiva.",
    preco: 249.90,
    imagem: "/assets/img/itachi.jpg",
    emoji: "🔴"
  },
  {
    id: 5,
    nome: "Goku Super Saiyajin",
    descricao: "Goku em modo Super Saiyajin com efeitos de ki e base de display exclusiva.",
    preco: 159.90,
    imagem: "/assets/img/goku.jpg",
    emoji: "⚡"
  }
];

// ============================================================
// CARRINHO - Dados do carrinho
// ============================================================
const carrinho = [
  { nome: "Naruto Uzumaki", preco: 189.90, quantidade: 1 },
  { nome: "Sasuke Uchiha", preco: 219.90, quantidade: 2 },
  { nome: "Eren Yeager", preco: 279.90, quantidade: 1 },
  { nome: "Itachi Uchiha", preco: 249.90, quantidade: 1 },
  { nome: "Goku Super Saiyajin", preco: 159.90, quantidade: 3 }
];

// ============================================================
// INDEX.HTML - Renderizar cards de produtos via DOM
// ============================================================
function renderizarProdutos() {
  const container = document.getElementById("produtos-container");

  if (!container) return;

  container.innerHTML = "";

  produtos.forEach((produto) => {
    const card = document.createElement("article");

    card.classList.add("card-produto");

    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" class="card-img">

      <div class="card-body">
        <h3 class="card-nome">${produto.nome}</h3>

        <p class="card-descricao">
          ${produto.descricao}
        </p>

        <div class="card-footer">
          <span class="card-preco">
            R$ ${produto.preco.toFixed(2).replace(".", ",")}
          </span>

          <button class="btn-adicionar" onclick="adicionarAoCarrinho(${produto.id})">
            + Carrinho
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// ============================================================
// BOTÃO ADICIONAR AO CARRINHO
// ============================================================
function adicionarAoCarrinho(id) {

  const btn = event.target;

  btn.textContent = "✓ Adicionado!";
  btn.classList.add("adicionado");

  setTimeout(() => {
    btn.textContent = "+ Carrinho";
    btn.classList.remove("adicionado");
  }, 1500);
}

// ============================================================
// LOJA.HTML - Renderizar Carrinho
// ============================================================
function renderizarCarrinho() {

  const lista = document.getElementById("lista-carrinho");

  if (!lista) return;

  lista.innerHTML = "";

  carrinho.forEach((item) => {

    const subtotal = item.preco * item.quantidade;

    const li = document.createElement("li");

    li.classList.add("item-carrinho");

    li.innerHTML = `
      <div class="item-info">
        <span class="item-nome">${item.nome}</span>
        <span class="item-qtd">Qtd: ${item.quantidade}</span>
      </div>

      <span class="item-subtotal">
        R$ ${subtotal.toFixed(2).replace(".", ",")}
      </span>
    `;

    lista.appendChild(li);
  });

  atualizarTotal();
}

// ============================================================
// CALCULAR TOTAL COM REDUCE
// ============================================================
function calcularTotal() {

  return carrinho.reduce((acumulador, item) => {
    return acumulador + item.preco * item.quantidade;
  }, 0);
}

// ============================================================
// FORMATAR MOEDA
// ============================================================
function formatarMoeda(valor) {

  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// ============================================================
// ATUALIZAR TOTAL
// ============================================================
let descontoAplicado = false;

function atualizarTotal() {

  const totalEl = document.getElementById("total-compra");

  if (!totalEl) return;

  const total = calcularTotal();

  totalEl.textContent = formatarMoeda(total);

  descontoAplicado = false;

  const btnDesconto = document.getElementById("btn-desconto");

  if (btnDesconto) {
    btnDesconto.textContent = "Aplicar 10% de Desconto";
    btnDesconto.disabled = false;
  }
}

// ============================================================
// APLICAR DESCONTO
// ============================================================
function aplicarDesconto() {

  if (descontoAplicado) return;

  const totalEl = document.getElementById("total-compra");
  const btnDesconto = document.getElementById("btn-desconto");

  if (!totalEl) return;

  const totalComDesconto = carrinho.reduce((acc, item) => {
    return acc + item.preco * item.quantidade * 0.9;
  }, 0);

  totalEl.textContent = formatarMoeda(totalComDesconto);

  totalEl.classList.add("com-desconto");

  descontoAplicado = true;

  if (btnDesconto) {
    btnDesconto.textContent = "✓ Desconto Aplicado!";
    btnDesconto.disabled = true;
  }

  let badge = document.getElementById("badge-desconto");

  if (!badge) {

    badge = document.createElement("span");

    badge.id = "badge-desconto";

    badge.classList.add("badge-desconto");

    badge.textContent = "-10%";

    totalEl.parentNode.appendChild(badge);
  }
}

// ============================================================
// INICIALIZAÇÃO
// ============================================================
document.addEventListener("DOMContentLoaded", () => {

  renderizarProdutos();

  renderizarCarrinho();
});