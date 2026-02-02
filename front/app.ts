/* =========================
   CLIENTES
========================= */

interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
}

const API_CLIENTES = "http://localhost:3000/clientes";

async function buscarClientes(): Promise<void> {
  try {
    const response = await fetch(API_CLIENTES);

    if (!response.ok) {
      throw new Error("Erro ao buscar clientes");
    }

    const result = await response.json();
    renderizarClientes(result.clientes);
  } catch (error) {
    console.error("Falha na conexão (clientes):", error);
  }
}

function renderizarClientes(clientes: Cliente[]): void {
  const tbody = document.querySelector("#clientes-tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  clientes.forEach(cliente => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${cliente.nome}</td>
      <td>${cliente.telefone}</td>
      <td>${cliente.email ?? "-"}</td>
      <td>
        <button 
          class="btn-remover-cliente"
          data-id="${cliente.id}"
          style="background:#dc2626; color:#fff; padding:6px 10px; border-radius:4px;"
        >
          Remover
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  // 🔥 evento de remover
  document
    .querySelectorAll<HTMLButtonElement>(".btn-remover-cliente")
    .forEach(button => {
      button.addEventListener("click", () => {
        const id = button.dataset.id;
        if (!id) return;
        abrirModalExcluirCliente(id);
      });
    });
}

/* =========================
   ADICIONAR CLIENTE
========================= */

let clienteIdParaExcluir: string | null = null;

const modalExcluirCliente =
  document.getElementById("modal-excluir-cliente") as HTMLDivElement | null;

const btnCancelarCliente =
  document.getElementById("btn-cancelar-cliente") as HTMLButtonElement | null;

const btnConfirmarCliente =
  document.getElementById("btn-confirmar-cliente") as HTMLButtonElement | null;


  function abrirModalExcluirCliente(id: string): void {
  clienteIdParaExcluir = id;
  modalExcluirCliente?.classList.remove("hidden");
}

function fecharModalExcluirCliente(): void {
  clienteIdParaExcluir = null;
  modalExcluirCliente?.classList.add("hidden");
}

btnCancelarCliente?.addEventListener("click", fecharModalExcluirCliente);


async function removerCliente(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_CLIENTES}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao excluir cliente");
    }

    buscarClientes();
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
    alert("Erro ao excluir cliente");
  }
}

btnConfirmarCliente?.addEventListener("click", () => {
  if (!clienteIdParaExcluir) return;

  removerCliente(clienteIdParaExcluir);
  fecharModalExcluirCliente();
});

const btnAddCliente = document.getElementById(
  "btn-add-cliente"
) as HTMLButtonElement | null;

const modalAdicionarCliente = document.getElementById(
  "modal-adicionar-cliente"
) as HTMLDivElement | null;

const inputNomeCliente = document.getElementById(
  "input-nome-cliente"
) as HTMLInputElement | null;

const inputTelefoneCliente = document.getElementById(
  "input-telefone-cliente"
) as HTMLInputElement | null;

const inputEmailCliente = document.getElementById(
  "input-email-cliente"
) as HTMLInputElement | null;

const btnCancelarAddCliente = document.getElementById(
  "btn-cancelar-add-cliente"
) as HTMLButtonElement | null;

const btnConfirmarAddCliente = document.getElementById(
  "btn-confirmar-add-cliente"
) as HTMLButtonElement | null;

/* ===== validações ===== */

function nomeClienteValido(nome: string): boolean {
  return /^[A-Za-zÀ-ÿ\s]+$/.test(nome);
}

function telefoneValido(telefone: string): boolean {
  return /^[0-9]+$/.test(telefone);
}

/* ===== modal ===== */

function abrirModalAdicionarCliente(): void {
  modalAdicionarCliente!.style.display = "flex";
}

function fecharModalAdicionarCliente(): void {
  modalAdicionarCliente!.style.display = "none";
}

btnCancelarAddCliente?.addEventListener("click", fecharModalAdicionarCliente);

/* ===== POST ===== */

async function adicionarCliente(
  nome: string,
  telefone: string,
  email: string
): Promise<void> {
  try {
    const response = await fetch(API_CLIENTES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        telefone,
        email,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar cliente");
    }

    buscarClientes();
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
  }
}

/* ===== eventos ===== */

btnAddCliente?.addEventListener("click", abrirModalAdicionarCliente);

btnCancelarAddCliente?.addEventListener("click", fecharModalAdicionarCliente);

btnConfirmarAddCliente?.addEventListener("click", () => {
  const nome = inputNomeCliente?.value.trim() ?? "";
  const telefone = inputTelefoneCliente?.value.trim() ?? "";
  const email = inputEmailCliente?.value.trim() ?? "";

  if (!nome || !telefone || !email) {
    alert("Preencha todos os campos");
    return;
  }

  if (!nomeClienteValido(nome)) {
    alert("Nome deve conter apenas letras");
    return;
  }

  if (!telefoneValido(telefone)) {
    alert("Telefone deve conter apenas números");
    return;
  }

  adicionarCliente(nome, telefone, email);
  fecharModalAdicionarCliente();
});


/* =========================
   BARBEIROS
========================= */

interface Barbeiro {
  id: string;
  nome: string;
}

const API_BARBEIROS = "http://localhost:3000/barbeiros";

// Modal
let barbeiroIdParaExcluir: string | null = null;
const modal = document.getElementById("modal-excluir") as HTMLDivElement | null;
const btnCancelar = document.getElementById("btn-cancelar") as HTMLButtonElement | null;
const btnConfirmar = document.getElementById("btn-confirmar") as HTMLButtonElement | null;
/* =========================
   ADICIONAR BARBEIRO
========================= */

// Botão + Adicionar
const btnAdd = document.getElementById("btn-add") as HTMLButtonElement | null;

// Modal adicionar
const modalAdicionar = document.getElementById("modal-adicionar") as HTMLDivElement | null;
const inputNomeBarbeiro = document.getElementById(
  "input-nome-barbeiro"
) as HTMLInputElement | null;

const btnCancelarAdd = document.getElementById("btn-cancelar-add") as HTMLButtonElement | null;
const btnConfirmarAdd = document.getElementById("btn-confirmar-add") as HTMLButtonElement | null;


function abrirModalAdicionar(): void {
  modalAdicionar?.classList.remove("hidden");
  if (inputNomeBarbeiro) inputNomeBarbeiro.value = "";
}

function fecharModalAdicionar(): void {
  modalAdicionar?.classList.add("hidden");
}

async function adicionarBarbeiro(nome: string): Promise<void> {
  try {
    const response = await fetch(API_BARBEIROS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome }),
    });

    if (!response.ok) {
      throw new Error("Erro ao adicionar barbeiro");
    }

    buscarBarbeiros();
  } catch (error) {
    console.error("Erro ao adicionar barbeiro:", error);
  }
}


async function buscarBarbeiros(): Promise<void> {
  try {
    const response = await fetch(API_BARBEIROS);

    if (!response.ok) {
      throw new Error("Erro ao buscar barbeiros");
    }

    const result = await response.json();
    renderizarBarbeiros(result.barbeiros);
  } catch (error) {
    console.error("Falha na conexão (barbeiros):", error);
  }
}

async function removerBarbeiro(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BARBEIROS}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao remover barbeiro");
    }

    buscarBarbeiros();
  } catch (error) {
    console.error("Erro ao remover:", error);
  }
}

function abrirModal(id: string): void {
  barbeiroIdParaExcluir = id;
  modal?.classList.remove("hidden");
}

function fecharModal(): void {
  barbeiroIdParaExcluir = null;
  modal?.classList.add("hidden");
}

btnCancelar?.addEventListener("click", fecharModal);

btnConfirmar?.addEventListener("click", () => {
  if (!barbeiroIdParaExcluir) return;
  removerBarbeiro(barbeiroIdParaExcluir);
  fecharModal();
});

function renderizarBarbeiros(barbeiros: Barbeiro[]): void {
  const container = document.getElementById("barbeiros-container");
  if (!container) return;

  container.innerHTML = "";

  barbeiros.forEach(barbeiro => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <span>Barbeiro</span>
      <strong>${barbeiro.nome}</strong>

      <br />

      <span>Horários Ocupados</span>
      <ul style="margin-top:8px; color:var(--muted); font-size:14px;">
        <li>Nenhum horário hoje</li>
      </ul>

      <br />

      <button
        class="btn-remover"
        data-id="${barbeiro.id}"
        style="background:#dc2626;"
      >
        Remover
      </button>
    `;

    container.appendChild(card);
  });

  document.querySelectorAll<HTMLButtonElement>(".btn-remover")
    .forEach(button => {
      button.addEventListener("click", () => {
        const id = button.dataset.id;
        if (!id) return;
        abrirModal(id);
      });
    });
}

function nomeValido(nome: string): boolean {
  // aceita letras (com acento) e espaços
  const regex = /^[A-Za-zÀ-ÿ\s]+$/;
  return regex.test(nome);
}

btnAdd?.addEventListener("click", abrirModalAdicionar);

btnCancelarAdd?.addEventListener("click", fecharModalAdicionar);

btnConfirmarAdd?.addEventListener("click", () => {
  const nome = inputNomeBarbeiro?.value.trim();
  if (!nome) return;

  if (!nomeValido(nome)) {
    alert("Digite apenas letras no nome do barbeiro.");
    return;
  }

  adicionarBarbeiro(nome);
  fecharModalAdicionar();
});


/* =========================
   INICIALIZAÇÃO
========================= */

if (window.location.pathname.includes("clientes.html")) {
  buscarClientes();
}

if (window.location.pathname.includes("barbeiros.html")) {
  buscarBarbeiros();
}
