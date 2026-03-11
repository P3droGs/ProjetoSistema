/* =========================
   UTILS
========================= */

function getElement<T extends HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

function getAllElements<T extends HTMLElement>(selector: string): NodeListOf<T> {
  return document.querySelectorAll<T>(selector);
}

async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(errorData.message || `Erro na requisição: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (response.status === 204 || !contentType || !contentType.includes("application/json")) {
      return {} as T; // Return an empty object or appropriate default for T
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar dados de ${url}:`, error);
    throw error; // Re-throw to allow specific error handling in calling functions
  }
}

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

class ClienteManager {
  private tbodyClientes: HTMLTableSectionElement;
  private modalAdicionarCliente: HTMLDivElement | null;
  private inputNomeCliente: HTMLInputElement | null;
  private inputTelefoneCliente: HTMLInputElement | null;
  private inputEmailCliente: HTMLInputElement | null;
  private btnAddCliente: HTMLButtonElement | null;
  private btnCancelarAddCliente: HTMLButtonElement | null;
  private btnConfirmarAddCliente: HTMLButtonElement | null;

  private modalAtualizarCliente: HTMLDivElement | null;
  private inputNomeAtualizarCliente: HTMLInputElement | null;
  private inputTelefoneAtualizarCliente: HTMLInputElement | null;
  private inputEmailAtualizarCliente: HTMLInputElement | null;
  private btnCancelarAtualizarCliente: HTMLButtonElement | null;
  private btnConfirmarAtualizarCliente: HTMLButtonElement | null;
  private clienteIdAtualizar: string | null = null;

  private modalExcluirCliente: HTMLDivElement | null;
  private btnCancelarExcluirCliente: HTMLButtonElement | null;
  private btnConfirmarExcluirCliente: HTMLButtonElement | null;
  private clienteIdExcluir: string | null = null;

  constructor() {
    this.tbodyClientes = getElement<HTMLTableSectionElement>("clientes-tbody")!;
    if (!this.tbodyClientes) throw new Error("Elemento #clientes-tbody não encontrado.");

    // Adicionar Cliente
    this.btnAddCliente = getElement<HTMLButtonElement>("btn-add-cliente");
    this.modalAdicionarCliente = getElement<HTMLDivElement>("modal-adicionar-cliente");
    this.inputNomeCliente = getElement<HTMLInputElement>("input-nome-cliente");
    this.inputTelefoneCliente = getElement<HTMLInputElement>("input-telefone-cliente");
    this.inputEmailCliente = getElement<HTMLInputElement>("input-email-cliente");
    this.btnCancelarAddCliente = getElement<HTMLButtonElement>("btn-cancelar-add-cliente");
    this.btnConfirmarAddCliente = getElement<HTMLButtonElement>("btn-confirmar-add-cliente");

    // Atualizar Cliente
    this.modalAtualizarCliente = getElement<HTMLDivElement>("modal-atualizar-cliente");
    this.inputNomeAtualizarCliente = getElement<HTMLInputElement>("input-nome-atualizar-cliente");
    this.inputTelefoneAtualizarCliente = getElement<HTMLInputElement>("input-telefone-atualizar-cliente");
    this.inputEmailAtualizarCliente = getElement<HTMLInputElement>("input-email-atualizar-cliente");
    this.btnCancelarAtualizarCliente = getElement<HTMLButtonElement>("btn-cancelar-atualizar-cliente");
    this.btnConfirmarAtualizarCliente = getElement<HTMLButtonElement>("btn-confirmar-atualizar-cliente");

    // Excluir Cliente
    this.modalExcluirCliente = getElement<HTMLDivElement>("modal-excluir-cliente");
    this.btnCancelarExcluirCliente = getElement<HTMLButtonElement>("btn-cancelar-cliente");
    this.btnConfirmarExcluirCliente = getElement<HTMLButtonElement>("btn-confirmar-cliente");

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.btnAddCliente?.addEventListener("click", () => this.abrirModalAdicionarCliente());
    this.btnCancelarAddCliente?.addEventListener("click", () => this.fecharModalAdicionarCliente());
    this.btnConfirmarAddCliente?.addEventListener("click", () => this.handleAdicionarCliente());

    this.btnCancelarAtualizarCliente?.addEventListener("click", () => this.fecharModalAtualizarCliente());
    this.btnConfirmarAtualizarCliente?.addEventListener("click", () => this.handleAtualizarCliente());

    this.btnCancelarExcluirCliente?.addEventListener("click", () => this.fecharModalExcluirCliente());
    this.btnConfirmarExcluirCliente?.addEventListener("click", () => this.handleRemoverCliente());

    // Event delegation for dynamically added buttons
    if (this.tbodyClientes) {
      this.tbodyClientes.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('btn-atualizar-cliente')) {
          const id = target.dataset.id;
          const nome = target.dataset.nome;
          const telefone = target.dataset.telefone;
          const email = target.dataset.email;
          if (id && nome && telefone) {
            this.abrirModalAtualizarCliente(id, nome, telefone, email ?? "");
          }
        } else if (target.classList.contains('btn-remover-cliente')) {
          const id = target.dataset.id;
          if (id) {
            this.abrirModalExcluirCliente(id);
          }
        }
      });
    }
  }

  public async buscarClientes(): Promise<void> {
    try {
      const result = await fetchData<{ clientes: Cliente[] }>(API_CLIENTES);
      this.renderizarClientes(result.clientes);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  }

  private renderizarClientes(clientes: Cliente[]): void {
    if (!this.tbodyClientes) return;

    this.tbodyClientes.innerHTML = "";

    clientes.forEach(cliente => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${cliente.nome}</td>
        <td>${cliente.telefone}</td>
        <td>${cliente.email ?? "-"}</td>
        <td>
          <button
            class="btn-atualizar-cliente"
            data-id="${cliente.id}"
            data-nome="${cliente.nome}"
            data-telefone="${cliente.telefone}"
            data-email="${cliente.email ?? ""}"
            style="background:#2563eb;color:#fff;padding:6px 10px;border-radius:4px;"
          >
            Atualizar
          </button>
          <button
            class="btn-remover-cliente"
            data-id="${cliente.id}"
            style="background:#dc2626;color:#fff;padding:6px 10px;border-radius:4px;"
          >
            Remover
          </button>
        </td>
      `;
      this.tbodyClientes.appendChild(tr);
    });
  }

  private abrirModalAdicionarCliente(): void {
    this.modalAdicionarCliente?.classList.remove("hidden");
    if (this.inputNomeCliente) this.inputNomeCliente.value = '';
    if (this.inputTelefoneCliente) this.inputTelefoneCliente.value = '';
    if (this.inputEmailCliente) this.inputEmailCliente.value = '';
  }

  private fecharModalAdicionarCliente(): void {
    this.modalAdicionarCliente?.classList.add("hidden");
  }

  private async handleAdicionarCliente(): Promise<void> {
    const nome = this.inputNomeCliente?.value.trim();
    const telefone = this.inputTelefoneCliente?.value.trim();
    const email = this.inputEmailCliente?.value.trim();

    if (!nome || !telefone) {
      alert("Nome e Telefone são obrigatórios.");
      return;
    }

    try {
      await fetchData(API_CLIENTES, {
        method: "POST",
        body: JSON.stringify({ nome, telefone, email }),
      });
      this.buscarClientes();
      this.fecharModalAdicionarCliente();
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
      alert("Erro ao adicionar cliente. Verifique o console para mais detalhes.");
    }
  }

  private abrirModalAtualizarCliente(id: string, nome: string, telefone: string, email: string): void {
    this.clienteIdAtualizar = id;
    if (this.inputNomeAtualizarCliente) this.inputNomeAtualizarCliente.value = nome;
    if (this.inputTelefoneAtualizarCliente) this.inputTelefoneAtualizarCliente.value = telefone;
    if (this.inputEmailAtualizarCliente) this.inputEmailAtualizarCliente.value = email;
    this.modalAtualizarCliente?.classList.remove("hidden");
  }

  private fecharModalAtualizarCliente(): void {
    this.clienteIdAtualizar = null;
    this.modalAtualizarCliente?.classList.add("hidden");
  }

  private async handleAtualizarCliente(): Promise<void> {
    const nome = this.inputNomeAtualizarCliente?.value.trim();
    const telefone = this.inputTelefoneAtualizarCliente?.value.trim();
    const email = this.inputEmailAtualizarCliente?.value.trim();

    if (!this.clienteIdAtualizar || !nome || !telefone) {
      alert("ID do cliente, Nome e Telefone são obrigatórios para atualização.");
      return;
    }

    try {
      await fetchData(`${API_CLIENTES}/${this.clienteIdAtualizar}`, {
        method: "PUT",
        body: JSON.stringify({ nome, telefone, email }),
      });
      this.buscarClientes();
      this.fecharModalAtualizarCliente();
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      alert("Erro ao atualizar cliente. Verifique o console para mais detalhes.");
    }
  }

  private abrirModalExcluirCliente(id: string): void {
    this.clienteIdExcluir = id;
    this.modalExcluirCliente?.classList.remove("hidden");
  }

  private fecharModalExcluirCliente(): void {
    this.clienteIdExcluir = null;
    this.modalExcluirCliente?.classList.add("hidden");
  }

  private async handleRemoverCliente(): Promise<void> {
    if (!this.clienteIdExcluir) {
      alert("Nenhum cliente selecionado para exclusão.");
      return;
    }

    try {
      await fetchData(`${API_CLIENTES}/${this.clienteIdExcluir}`, {
        method: "DELETE",
      });
      this.buscarClientes();
      this.fecharModalExcluirCliente();
    } catch (error) {
      console.error("Erro ao remover cliente:", error);
      alert("Erro ao remover cliente. Verifique o console para mais detalhes.");
    }
  }
}

/* =========================
   BARBEIROS
========================= */

interface Barbeiro {
  id: string;
  nome: string;
}

const API_BARBEIROS = "http://localhost:3000/barbeiros";

class BarbeiroManager {
  private containerBarbeiros: HTMLDivElement;

  private modalExcluirBarbeiro: HTMLDivElement | null;
  private btnCancelarExcluirBarbeiro: HTMLButtonElement | null;
  private btnConfirmarExcluirBarbeiro: HTMLButtonElement | null;
  private barbeiroIdParaExcluir: string | null = null;

  private modalAdicionarBarbeiro: HTMLDivElement | null;
  private btnAddBarbeiro: HTMLButtonElement | null;
  private inputNomeBarbeiro: HTMLInputElement | null;
  private btnCancelarAddBarbeiro: HTMLButtonElement | null;
  private btnConfirmarAddBarbeiro: HTMLButtonElement | null;

  private modalAtualizarBarbeiro: HTMLDivElement | null;
  private inputNomeAtualizarBarbeiro: HTMLInputElement | null;
  private btnCancelarAtualizarBarbeiro: HTMLButtonElement | null;
  private btnConfirmarAtualizarBarbeiro: HTMLButtonElement | null;
  private barbeiroIdAtualizar: string | null = null;

  constructor() {
    this.containerBarbeiros = getElement<HTMLDivElement>("barbeiros-container")!;
    if (!this.containerBarbeiros) throw new Error("Elemento #barbeiros-container não encontrado.");

    // Excluir Barbeiro
    this.modalExcluirBarbeiro = getElement<HTMLDivElement>("modal-excluir");
    this.btnCancelarExcluirBarbeiro = getElement<HTMLButtonElement>("btn-cancelar");
    this.btnConfirmarExcluirBarbeiro = getElement<HTMLButtonElement>("btn-confirmar");

    // Adicionar Barbeiro
    this.btnAddBarbeiro = getElement<HTMLButtonElement>("btn-add");
    this.modalAdicionarBarbeiro = getElement<HTMLDivElement>("modal-adicionar");
    this.inputNomeBarbeiro = getElement<HTMLInputElement>("input-nome-barbeiro");
    this.btnCancelarAddBarbeiro = getElement<HTMLButtonElement>("btn-cancelar-add");
    this.btnConfirmarAddBarbeiro = getElement<HTMLButtonElement>("btn-confirmar-add");

    // Atualizar Barbeiro
    this.modalAtualizarBarbeiro = getElement<HTMLDivElement>("modal-atualizar");
    this.inputNomeAtualizarBarbeiro = getElement<HTMLInputElement>("input-nome-atualizar");
    this.btnCancelarAtualizarBarbeiro = getElement<HTMLButtonElement>("btn-cancelar-atualizar");
    this.btnConfirmarAtualizarBarbeiro = getElement<HTMLButtonElement>("btn-confirmar-atualizar");

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.btnAddBarbeiro?.addEventListener("click", () => this.abrirModalAdicionarBarbeiro());
    this.btnCancelarAddBarbeiro?.addEventListener("click", () => this.fecharModalAdicionarBarbeiro());
    this.btnConfirmarAddBarbeiro?.addEventListener("click", () => this.handleAdicionarBarbeiro());

    this.btnCancelarAtualizarBarbeiro?.addEventListener("click", () => this.fecharModalAtualizarBarbeiro());
    this.btnConfirmarAtualizarBarbeiro?.addEventListener("click", () => this.handleAtualizarBarbeiro());

    this.btnCancelarExcluirBarbeiro?.addEventListener("click", () => this.fecharModalExcluirBarbeiro());
    this.btnConfirmarExcluirBarbeiro?.addEventListener("click", () => this.handleRemoverBarbeiro());

    // Event delegation for dynamically added buttons
    if (this.containerBarbeiros) {
      this.containerBarbeiros.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('btn-atualizar')) {
          const id = target.dataset.id;
          const nome = target.dataset.nome;
          if (id && nome) {
            this.abrirModalAtualizarBarbeiro(id, nome);
          }
        } else if (target.classList.contains('btn-remover')) {
          const id = target.dataset.id;
          if (id) {
            this.abrirModalExcluirBarbeiro(id);
          }
        }
      });
    }
  }

  public async buscarBarbeiros(): Promise<void> {
    try {
      const result = await fetchData<{ barbeiros: Barbeiro[] }>(API_BARBEIROS);
      this.renderizarBarbeiros(result.barbeiros);
    } catch (error) {
      console.error("Erro ao buscar barbeiros:", error);
    }
  }

  private renderizarBarbeiros(barbeiros: Barbeiro[]): void {
    if (!this.containerBarbeiros) return;

    this.containerBarbeiros.innerHTML = "";

    barbeiros.forEach(barbeiro => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <span>Barbeiro</span>
        <strong>${barbeiro.nome}</strong>

        <br>

        <button
          class="btn-atualizar"
          data-id="${barbeiro.id}"
          data-nome="${barbeiro.nome}"
          style="background:#2563eb;"
        >
          Atualizar
        </button>

        <button
          class="btn-remover"
          data-id="${barbeiro.id}"
          style="background:#dc2626;"
        >
          Remover
        </button>
      `;
      this.containerBarbeiros.appendChild(card);
    });
  }

  private abrirModalAdicionarBarbeiro(): void {
    this.modalAdicionarBarbeiro?.classList.remove("hidden");
    if (this.inputNomeBarbeiro) this.inputNomeBarbeiro.value = '';
  }

  private fecharModalAdicionarBarbeiro(): void {
    this.modalAdicionarBarbeiro?.classList.add("hidden");
  }

  private async handleAdicionarBarbeiro(): Promise<void> {
    const nome = this.inputNomeBarbeiro?.value.trim();
    if (!nome) {
      alert("Nome do barbeiro é obrigatório.");
      return;
    }

    try {
      await fetchData(API_BARBEIROS, {
        method: "POST",
        body: JSON.stringify({ nome }),
      });
      this.buscarBarbeiros();
      this.fecharModalAdicionarBarbeiro();
    } catch (error) {
      console.error("Erro ao adicionar barbeiro:", error);
      alert("Erro ao adicionar barbeiro. Verifique o console para mais detalhes.");
    }
  }

  private abrirModalAtualizarBarbeiro(id: string, nome: string): void {
    this.barbeiroIdAtualizar = id;
    if (this.inputNomeAtualizarBarbeiro) {
      this.inputNomeAtualizarBarbeiro.value = nome;
    }
    this.modalAtualizarBarbeiro?.classList.remove("hidden");
  }

  private fecharModalAtualizarBarbeiro(): void {
    this.barbeiroIdAtualizar = null;
    this.modalAtualizarBarbeiro?.classList.add("hidden");
  }

  private async handleAtualizarBarbeiro(): Promise<void> {
    const nome = this.inputNomeAtualizarBarbeiro?.value.trim();

    if (!nome || !this.barbeiroIdAtualizar) {
      alert("ID do barbeiro e Nome são obrigatórios para atualização.");
      return;
    }

    try {
      await fetchData(`${API_BARBEIROS}/atualizar/${this.barbeiroIdAtualizar}`, {
        method: "PUT",
        body: JSON.stringify({ nome }),
      });
      this.buscarBarbeiros();
      this.fecharModalAtualizarBarbeiro();
    } catch (error) {
      console.error("Erro ao atualizar barbeiro:", error);
      alert("Erro ao atualizar barbeiro. Verifique o console para mais detalhes.");
    }
  }

  private abrirModalExcluirBarbeiro(id: string): void {
    this.barbeiroIdParaExcluir = id;
    this.modalExcluirBarbeiro?.classList.remove("hidden");
  }

  private fecharModalExcluirBarbeiro(): void {
    this.barbeiroIdParaExcluir = null;
    this.modalExcluirBarbeiro?.classList.add("hidden");
  }

  private async handleRemoverBarbeiro(): Promise<void> {
    if (!this.barbeiroIdParaExcluir) {
      alert("Nenhum barbeiro selecionado para exclusão.");
      return;
    }

    try {
      await fetchData(`${API_BARBEIROS}/${this.barbeiroIdParaExcluir}`, {
        method: "DELETE",
      });
      this.buscarBarbeiros();
      this.fecharModalExcluirBarbeiro();
    } catch (error) {
      console.error("Erro ao remover barbeiro:", error);
      alert("Erro ao remover barbeiro. Verifique o console para mais detalhes.");
    }
  }
}

/* =========================
   AGENDAMENTOS HOJE
========================= */

interface AgendamentoHoje {
  id: string;
  hora_inicio: string;
  hora_fim: string;
  status: string;
  cliente: string | null;
  servico: string | null;
}

const API_AGENDAMENTOS_HOJE = "http://localhost:3000/agendamentos/hoje";

class AgendamentoHojeManager {
  private tbodyAgendamentos: HTMLTableSectionElement;

  constructor() {
    this.tbodyAgendamentos = getElement<HTMLTableSectionElement>("agendamentos-body")!;
    if (!this.tbodyAgendamentos) throw new Error("Elemento #agendamentos-body não encontrado.");
  }

  public async buscarAgendamentosHoje(): Promise<void> {
    try {
      const agendamentos = await fetchData<AgendamentoHoje[]>(API_AGENDAMENTOS_HOJE);
      this.renderizarAgendamentosHoje(agendamentos);
    } catch (error) {
      console.error("Erro ao buscar agendamentos de hoje:", error);
    }
  }

  private renderizarAgendamentosHoje(agendamentos: AgendamentoHoje[]): void {
    if (!this.tbodyAgendamentos) return;

    this.tbodyAgendamentos.innerHTML = "";

    agendamentos.forEach(ag => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${ag.hora_inicio.slice(0, 5)}</td>
        <td>${ag.cliente ?? "-"}</td>
        <td>${ag.servico ?? "-"}</td>
        <td>${ag.status}</td>
      `;
      this.tbodyAgendamentos.appendChild(tr);
    });
  }
}

/* =========================
   INICIALIZAÇÃO GLOBAL
========================= */
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("clientes.html")) {
    const clienteManager = new ClienteManager();
    clienteManager.buscarClientes();
  }

  if (window.location.pathname.includes("barbeiros.html")) {
    const barbeiroManager = new BarbeiroManager();
    barbeiroManager.buscarBarbeiros();
  }

  if (window.location.pathname.includes("agendamentos.html")) {
    const agendamentoHojeManager = new AgendamentoHojeManager();
    agendamentoHojeManager.buscarAgendamentosHoje();
  }
});