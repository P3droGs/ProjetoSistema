interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email: string;
}

const API_URL = "http://localhost:3000/clientes";

async function buscarClientes(): Promise<void> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Erro ao buscar clientes");
    }

    const result = await response.json();

    // 🔥 AQUI ESTÁ O AJUSTE PARA SEU BACKEND
    const clientes: Cliente[] = result.clientes;

    renderizarClientes(clientes);
  } catch (error) {
    console.error("Falha na conexão:", error);
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
      <td>${cliente.email}</td>
      <td>-</td>
    `;

    tbody.appendChild(tr);
  });
}

// ✅ Garante que só roda em clientes.html
if (window.location.pathname.includes("clientes.html")) {
  buscarClientes();
}



interface Barbeiro {
  id: string;
  nome: string;
}

const API_BARBEIROS = "http://localhost:3000/barbeiros";

async function buscarBarbeiros(): Promise<void> {
  try {
    const response = await fetch(API_BARBEIROS);

    if (!response.ok) {
      throw new Error("Erro ao buscar barbeiros");
    }

    const result = await response.json();

    const barbeiros: Barbeiro[] = result.barbeiros;

    renderizarBarbeiros(barbeiros);
  } catch (error) {
    console.error("Falha na conexão:", error);
  }
}

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

      <button style="background:#dc2626;" data-id="${barbeiro.id}">
        Remover
      </button>
    `;

    container.appendChild(card);
  });
}

// Só executa nessa página
if (window.location.pathname.includes("barbeiros.html")) {
  buscarBarbeiros();
}
