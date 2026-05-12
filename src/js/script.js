// PRODUTOS - Dados dos Action Figures
const produtos = [
  {
    id: 1,
    nome: "Naruto Uzumaki",
    descricao: "Action Figure articulado do Naruto clássico com uniforme laranja icônico e detalhes realistas.",
    preco: 189.90,
    imagem: "../assets/img/naruto.jpg",
    emoji: "🍥"
  },
  {
    id: 2,
    nome: "Sasuke Uchiha",
    descricao: "Figura do Sasuke em pose de batalha utilizando o Sharingan com efeito especial giratório.",
    preco: 219.90,
    imagem: "../assets/img/sasuke.jpg",
    emoji: "⚡"
  },
  {
    id: 3,
    nome: "Eren Yeager",
    descricao: "Action Figure premium do Eren Yeager com equipamento tridimensional e espadas da Tropa de Exploração.",
    preco: 279.90,
    imagem: "../assets/img/eren.jpg",
    emoji: "🛡️"
  },
  {
    id: 4,
    nome: "Itachi Uchiha",
    descricao: "Figura colecionável do Itachi com manto Akatsuki, corvos detalhados e base temática exclusiva.",
    preco: 249.90,
    imagem: "../assets/img/itachi.jpg",
    emoji: "🔴"
  },
  { id: 5, nome: "Goku Super Saiyajin",
    descricao: "Goku em modo Super Saiyajin com efeitos de ki e base de display exclusiva.",
    preco: 159.90,
    imagem: "../src/assets/img/goku.jpg",
    emoji: "⚡"
 },
];

// Renderiza os cards de produtos no index.html via DOM
function renderizarProdutos() {
  const container = document.getElementById("produtos-container");
  if (!container) return;
 
  container.innerHTML = "";
 
  produtos.forEach((produto) => {
    const card = document.createElement("article");
    card.classList.add("card-produto");
    card.innerHTML = `
<div class="card-emoji">${produto.emoji}</div>
<div class="card-body">
<h3 class="card-nome">${produto.nome}</h3>
<p class="card-descricao">${produto.descricao}</p>
<div class="card-footer">
<span class="card-preco">R$ ${produto.preco.toFixed(2).replace(".", ",")}</span>
<button class="btn-adicionar" onclick="adicionarAoCarrinho(${produto.id})">
            + Carrinho
</button>
</div>
</div>
    `;
    container.appendChild(card);
  });
}
 
function adicionarAoCarrinho(id) {
  const btn = event.target;
  btn.textContent = "✓ Adicionado!";
  btn.classList.add("adicionado");
  setTimeout(() => {
    btn.textContent = "+ Carrinho";
    btn.classList.remove("adicionado");
  }, 1500);
}

// Calcula o total do carrinho usando Reduce
function calcularTotal() {
  return carrinho.reduce((acumulador, item) => {
    return acumulador + item.preco * item.quantidade;
  }, 0);
}
 
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
 
function atualizarTotal() {
  const totalEl = document.getElementById("total-compra");
  if (!totalEl) return;
  const total = calcularTotal();
  totalEl.textContent = formatarMoeda(total);
}

// Aplica desconto de 10% usando Reduce
let descontoAplicado = false;
 
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