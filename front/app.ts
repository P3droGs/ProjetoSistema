/* =========================
   CLIENTES
========================= */

interface Cliente {
 id: string
 nome: string
 telefone: string
 email?: string
}

const API_CLIENTES = "http://localhost:3000/clientes"

const tbodyClientes = document.getElementById("clientes-tbody")

async function buscarClientes(): Promise<void>{

 const response = await fetch(API_CLIENTES)

 const result = await response.json()

 renderizarClientes(result.clientes)

}



function renderizarClientes(clientes: Cliente[]): void {

 if(!tbodyClientes) return

 tbodyClientes.innerHTML = ""

 clientes.forEach(cliente => {

 const tr = document.createElement("tr")

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

`

 tbodyClientes.appendChild(tr)

 })


 document.querySelectorAll<HTMLButtonElement>(".btn-remover-cliente")

 .forEach(btn=>{

 btn.addEventListener("click",()=>{

 const id = btn.dataset.id

 if(!id) return

 abrirModalExcluirCliente(id)

 })

 })


 document.querySelectorAll<HTMLButtonElement>(".btn-atualizar-cliente")

 .forEach(btn=>{

 btn.addEventListener("click",()=>{

 const id = btn.dataset.id

 const nome = btn.dataset.nome

 const telefone = btn.dataset.telefone

 const email = btn.dataset.email

 if(!id || !nome || !telefone) return

 abrirModalAtualizarCliente(id,nome,telefone,email ?? "")

 })

 })

}






/* =====================

ADICIONAR CLIENTE

===================== */

const btnAddCliente = document.getElementById("btn-add-cliente")

const modalAdicionarCliente = document.getElementById("modal-adicionar-cliente")

const inputNomeCliente = document.getElementById("input-nome-cliente") as HTMLInputElement

const inputTelefoneCliente = document.getElementById("input-telefone-cliente") as HTMLInputElement

const inputEmailCliente = document.getElementById("input-email-cliente") as HTMLInputElement

const btnCancelarAddCliente = document.getElementById("btn-cancelar-add-cliente")

const btnConfirmarAddCliente = document.getElementById("btn-confirmar-add-cliente")


function abrirModalAdicionarCliente(){

 modalAdicionarCliente?.classList.remove("hidden")

}

function fecharModalAdicionarCliente(){

 modalAdicionarCliente?.classList.add("hidden")

}



async function adicionarCliente(nome:string,telefone:string,email:string){

 await fetch(API_CLIENTES,{

 method:"POST",

 headers:{

 "Content-Type":"application/json"

 },

 body:JSON.stringify({nome,telefone,email})

 })

 buscarClientes()

}


btnAddCliente?.addEventListener("click",abrirModalAdicionarCliente)

btnCancelarAddCliente?.addEventListener("click",fecharModalAdicionarCliente)

btnConfirmarAddCliente?.addEventListener("click",()=>{

 const nome = inputNomeCliente.value

 const telefone = inputTelefoneCliente.value

 const email = inputEmailCliente.value

 if(!nome || !telefone) return

 adicionarCliente(nome,telefone,email)

 fecharModalAdicionarCliente()

})



/* =====================

ATUALIZAR CLIENTE

===================== */

let clienteIdAtualizar:string | null = null

const modalAtualizarCliente = document.getElementById("modal-atualizar-cliente")

const inputNomeAtualizarCliente = document.getElementById("input-nome-atualizar-cliente") as HTMLInputElement

const inputTelefoneAtualizarCliente = document.getElementById("input-telefone-atualizar-cliente") as HTMLInputElement

const inputEmailAtualizarCliente = document.getElementById("input-email-atualizar-cliente") as HTMLInputElement

const btnCancelarAtualizarCliente = document.getElementById("btn-cancelar-atualizar-cliente")

const btnConfirmarAtualizarCliente = document.getElementById("btn-confirmar-atualizar-cliente")


function abrirModalAtualizarCliente(id:string,nome:string,telefone:string,email:string){

 clienteIdAtualizar = id

 inputNomeAtualizarCliente.value = nome

 inputTelefoneAtualizarCliente.value = telefone

 inputEmailAtualizarCliente.value = email

 modalAtualizarCliente?.classList.remove("hidden")

}

function fecharModalAtualizarCliente(){

 clienteIdAtualizar = null

 modalAtualizarCliente?.classList.add("hidden")

}



async function atualizarCliente(id:string,nome:string,telefone:string,email:string){

 await fetch(`${API_CLIENTES}/${id}`,{

 method:"PUT",

 headers:{

 "Content-Type":"application/json"

 },

 body:JSON.stringify({nome,telefone,email})

 })

 buscarClientes()

}



btnCancelarAtualizarCliente?.addEventListener("click",fecharModalAtualizarCliente)

btnConfirmarAtualizarCliente?.addEventListener("click",()=>{

 const nome = inputNomeAtualizarCliente.value

 const telefone = inputTelefoneAtualizarCliente.value

 const email = inputEmailAtualizarCliente.value

 if(!clienteIdAtualizar) return

 atualizarCliente(clienteIdAtualizar,nome,telefone,email)

 fecharModalAtualizarCliente()

})




/* =====================

EXCLUIR CLIENTE

===================== */

let clienteIdExcluir:string | null = null

const modalExcluirCliente = document.getElementById("modal-excluir-cliente")

const btnCancelarCliente = document.getElementById("btn-cancelar-cliente")

const btnConfirmarCliente = document.getElementById("btn-confirmar-cliente")


function abrirModalExcluirCliente(id:string){

 clienteIdExcluir = id

 modalExcluirCliente?.classList.remove("hidden")

}

function fecharModalExcluirCliente(){

 clienteIdExcluir = null

 modalExcluirCliente?.classList.add("hidden")

}



async function removerCliente(id:string){

 await fetch(`${API_CLIENTES}/${id}`,{

 method:"DELETE"

 })

 buscarClientes()

}



btnCancelarCliente?.addEventListener("click",fecharModalExcluirCliente)

btnConfirmarCliente?.addEventListener("click",()=>{

 if(!clienteIdExcluir) return

 removerCliente(clienteIdExcluir)

 fecharModalExcluirCliente()

})




/* =====================

INICIALIZAÇÃO

===================== */

if(window.location.pathname.includes("clientes.html")){

 buscarClientes()

}

/* =========================
   BARBEIROS
========================= */

interface Barbeiro {
  id: string;
  nome: string;
}

const API_BARBEIROS = "http://localhost:3000/barbeiros";

/* MODAL EXCLUIR */

let barbeiroIdParaExcluir: string | null = null;

const modalExcluirBarbeiro =
  document.getElementById("modal-excluir") as HTMLDivElement | null;

const btnCancelarBarbeiro =
  document.getElementById("btn-cancelar") as HTMLButtonElement | null;

const btnConfirmarBarbeiro =
  document.getElementById("btn-confirmar") as HTMLButtonElement | null;

/* MODAL ADICIONAR */

const btnAdd = document.getElementById("btn-add") as HTMLButtonElement | null;

const modalAdicionar = document.getElementById(
  "modal-adicionar"
) as HTMLDivElement | null;

const inputNomeBarbeiro = document.getElementById(
  "input-nome-barbeiro"
) as HTMLInputElement | null;

const btnCancelarAdd = document.getElementById(
  "btn-cancelar-add"
) as HTMLButtonElement | null;

const btnConfirmarAdd = document.getElementById(
  "btn-confirmar-add"
) as HTMLButtonElement | null;

/* MODAL ATUALIZAR */

let barbeiroIdAtualizar: string | null = null;

const modalAtualizar = document.getElementById(
  "modal-atualizar"
) as HTMLDivElement | null;

const inputNomeAtualizar = document.getElementById(
  "input-nome-atualizar"
) as HTMLInputElement | null;

const btnCancelarAtualizar = document.getElementById(
  "btn-cancelar-atualizar"
) as HTMLButtonElement | null;

const btnConfirmarAtualizar = document.getElementById(
  "btn-confirmar-atualizar"
) as HTMLButtonElement | null;

/* FUNÇÕES */

async function buscarBarbeiros(): Promise<void> {
  try {
    const response = await fetch(API_BARBEIROS);

    if (!response.ok) {
      throw new Error("Erro ao buscar barbeiros");
    }

    const result = await response.json();
    renderizarBarbeiros(result.barbeiros);
  } catch (error) {
    console.error("Erro ao buscar barbeiros:", error);
  }
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
    console.error("Erro ao remover barbeiro:", error);
  }
}

async function atualizarBarbeiro(id: string, nome: string): Promise<void> {
  try {
    const response = await fetch(`${API_BARBEIROS}/atualizar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome }),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar barbeiro");
    }

    buscarBarbeiros();
  } catch (error) {
    console.error("Erro ao atualizar barbeiro:", error);
  }
}

/* MODAIS */

function abrirModalExcluirBarbeiro(id: string): void {
  barbeiroIdParaExcluir = id;
  modalExcluirBarbeiro?.classList.remove("hidden");
}

function fecharModalExcluirBarbeiro(): void {
  barbeiroIdParaExcluir = null;
  modalExcluirBarbeiro?.classList.add("hidden");
}

function abrirModalAdicionar(): void {
  modalAdicionar?.classList.remove("hidden");
}

function fecharModalAdicionar(): void {
  modalAdicionar?.classList.add("hidden");
}

function abrirModalAtualizar(id: string, nome: string): void {
  barbeiroIdAtualizar = id;

  if (inputNomeAtualizar) {
    inputNomeAtualizar.value = nome;
  }

  modalAtualizar?.classList.remove("hidden");
}

function fecharModalAtualizar(): void {
  barbeiroIdAtualizar = null;
  modalAtualizar?.classList.add("hidden");
}

/* EVENTOS */

btnCancelarBarbeiro?.addEventListener("click", fecharModalExcluirBarbeiro);

btnConfirmarBarbeiro?.addEventListener("click", () => {
  if (!barbeiroIdParaExcluir) return;

  removerBarbeiro(barbeiroIdParaExcluir);
  fecharModalExcluirBarbeiro();
});

btnAdd?.addEventListener("click", abrirModalAdicionar);

btnCancelarAdd?.addEventListener("click", fecharModalAdicionar);

btnConfirmarAdd?.addEventListener("click", () => {
  const nome = inputNomeBarbeiro?.value.trim();
  if (!nome) return;

  adicionarBarbeiro(nome);
  fecharModalAdicionar();
});

btnCancelarAtualizar?.addEventListener("click", fecharModalAtualizar);

btnConfirmarAtualizar?.addEventListener("click", () => {
  const nome = inputNomeAtualizar?.value.trim();

  if (!nome || !barbeiroIdAtualizar) return;

  atualizarBarbeiro(barbeiroIdAtualizar, nome);
  fecharModalAtualizar();
});

/* RENDER BARBEIROS */

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

    container.appendChild(card);
  });

  document.querySelectorAll<HTMLButtonElement>(".btn-remover")
    .forEach(button => {
      button.addEventListener("click", () => {
        const id = button.dataset.id;
        if (!id) return;

        abrirModalExcluirBarbeiro(id);
      });
    });

  document.querySelectorAll<HTMLButtonElement>(".btn-atualizar")
    .forEach(button => {
      button.addEventListener("click", () => {
        const id = button.dataset.id;
        const nome = button.dataset.nome;

        if (!id || !nome) return;

        abrirModalAtualizar(id, nome);
      });
    });
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

const API_AGENDAMENTOS_HOJE =
  "http://localhost:3000/agendamentos/hoje";

async function buscarAgendamentosHoje(): Promise<void> {
  try {
    const response = await fetch(API_AGENDAMENTOS_HOJE);

    if (!response.ok) {
      throw new Error("Erro ao buscar agendamentos");
    }

    const agendamentos: AgendamentoHoje[] = await response.json();

    renderizarAgendamentosHoje(agendamentos);
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
  }
}

function renderizarAgendamentosHoje(
  agendamentos: AgendamentoHoje[]
): void {
  const tbody = document.getElementById("agendamentos-body");

  if (!tbody) return;

  tbody.innerHTML = "";

  agendamentos.forEach(ag => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${ag.hora_inicio.slice(0,5)}</td>
      <td>${ag.cliente ?? "-"}</td>
      <td>${ag.servico ?? "-"}</td>
      <td>${ag.status}</td>
    `;

    tbody.appendChild(tr);
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

if (window.location.pathname.includes("agendamentos.html")) {
  buscarAgendamentosHoje();
}