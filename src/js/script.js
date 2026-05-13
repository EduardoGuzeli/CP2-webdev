// ============================================================
// PRODUTOS - Dados dos Action Figures
// ============================================================
const produtos = [
  {
    id: 1,
    nome: "Naruto Uzumaki",
   descricao: "Figure premium do Naruto Uzumaki com  Kurama em chamas ao fundo, pose confiante e detalhes   realistas inspirados no anime clássico.",
    preco: 189.90,
    imagem: "/src/assets/img/naruto.jpg",
    emoji: "🍥"
  },
  {
    id: 2,
    nome: "Sasuke Uchiha",
    descricao: "Figure colecionável do Sasuke Uchiha com efeito de Chidori elétrico, espada em mãos e visual inspirado em Naruto Shippuden.",
    preco: 219.90,
    imagem: "/src/assets/img/sasuke.jpg",
    emoji: "⚡"
  },
  {
    id: 3,
    nome: "Eren Yeager",
    descricao: "Action figure do Eren Yeager equipada com o dispositivo de manobra tridimensional, capa da Tropa de Exploração e cenário de batalha épico.",
    preco: 279.90,
    imagem: "/src/assets/img/eren.jpg",
    emoji: "🛡️"
  },
  {
    id: 4,
    nome: "Itachi Uchiha",
    descricao: "Figure detalhada do Itachi Uchiha com manto da Akatsuki, corvos sombrios e efeitos visuais inspirados no Mangekyou Sharingan.",
    preco: 249.90,
    imagem: "/src/assets/img/itachi.jpg",
    emoji: "🔴"
  },
  {
    id: 5,
    nome: "Goku Super Saiyajin",
    descricao: "Action figure do Goku Super Saiyajin com aura de energia intensa, uniforme clássico e pose inspirada nas batalhas de Dragon Ball Z.",
    preco: 159.90,
    imagem: "/src/assets/img/goku.jpg",
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
 
  if (carrinho.length === 0) {
    lista.innerHTML = `<li class="carrinho-vazio">🛒 Seu carrinho está vazio.</li>`;
    atualizarTotal();
    return;
  }
 
  carrinho.forEach((item, index) => {
 
    const subtotal = item.preco * item.quantidade;
 
    const li = document.createElement("li");
 
    li.classList.add("item-carrinho");
 
    li.innerHTML = `
      <div class="item-info">
        <span class="item-nome">${item.nome}</span>
        <span class="item-qtd">Qtd: ${item.quantidade}</span>
      </div>
 
      <div class="item-acoes">
        <span class="item-subtotal">
          R$ ${subtotal.toFixed(2).replace(".", ",")}
        </span>
        <button class="btn-remover" onclick="removerItem(${index})" title="Remover item">
          ✕
        </button>
      </div>
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
 
  const subtotalEl = document.getElementById("subtotal-label");
  if (subtotalEl) {
   subtotalEl.textContent = formatarMoeda(total);
  }
  
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
// REMOVER ITEM DO CARRINHO
// ============================================================
function removerItem(index) {
 
  carrinho.splice(index, 1);
 
  // Remove badge de desconto se existir, pois o total mudou
  const badge = document.getElementById("badge-desconto");
  if (badge) badge.remove();
 
  const totalEl = document.getElementById("total-compra");
  if (totalEl) totalEl.classList.remove("com-desconto");
 
  renderizarCarrinho();
}
 
// ============================================================
// INICIALIZAÇÃO
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
 
  renderizarProdutos();
 
  renderizarCarrinho();
});