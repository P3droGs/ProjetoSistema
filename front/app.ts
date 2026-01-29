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
  const tbody = document.querySelector("table tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  clientes.forEach(cliente => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${cliente.nome}</td>
      <td>${cliente.telefone}</td>
      <td>${cliente.email ?? "-"}</td>
    `;
    tbody.appendChild(tr);
  });
}

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

/* =========================
   INICIALIZAÇÃO
========================= */

if (window.location.pathname.includes("clientes.html")) {
  buscarClientes();
}

if (window.location.pathname.includes("barbeiros.html")) {
  buscarBarbeiros();
}
