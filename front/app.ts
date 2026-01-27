interface Cliente {
  id: string;
  nome: string;
  telefone: string;
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
      <td>-</td>
    `;

    tbody.appendChild(tr);
  });
}

// ✅ Garante que só roda em clientes.html
if (window.location.pathname.includes("clientes.html")) {
  buscarClientes();
}
