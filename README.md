# 💈 Sistema de Gestão de Barbearia

Este projeto é um **Sistema de Gestão de Barbearia** completo, desenvolvido com uma arquitetura moderna e separação clara entre **Frontend** e **Backend**. O sistema permite o gerenciamento de barbeiros, clientes e o acompanhamento de agendamentos diários, proporcionando uma ferramenta eficiente para a organização de serviços de barbearia.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias e ferramentas:

### **Backend (Servidor)**
*   **Node.js**: Ambiente de execução para o servidor.
*   **TypeScript**: Adição de tipagem estática para maior segurança e produtividade.
*   **Express.js**: Framework para criação de APIs RESTful.
*   **PostgreSQL**: Banco de dados relacional para persistência de dados.
*   **Zod**: Biblioteca para validação de esquemas e dados.
*   **ts-node-dev**: Ferramenta para reinicialização automática do servidor durante o desenvolvimento.

### **Frontend (Interface)**
*   **HTML5 & CSS3**: Estruturação e estilização da interface.
*   **TypeScript**: Lógica de interação com a API e manipulação do DOM de forma tipada.
*   **Vanilla JS/TS**: Abordagem direta sem a necessidade de frameworks pesados, garantindo leveza.

---

## 📋 Funcionalidades Principais

O sistema oferece uma série de funcionalidades para facilitar a gestão do negócio:

1.  **Gestão de Barbeiros**:
    *   Cadastro de novos profissionais.
    *   Listagem completa de barbeiros ativos.
    *   Atualização de dados cadastrais.
    *   Remoção de barbeiros do sistema.

2.  **Gestão de Clientes**:
    *   Cadastro de clientes com nome, telefone e e-mail.
    *   Listagem e consulta de clientes cadastrados.
    *   Edição de informações de contato.
    *   Exclusão de registros de clientes.

3.  **Monitoramento de Agendamentos**:
    *   Visualização centralizada dos agendamentos marcados para o dia atual.
    *   Exibição de horários, nomes dos clientes, serviços solicitados e status.

4.  **Banco de Dados Robusto**:
    *   Uso de UUIDs para identificadores únicos.
    *   Relacionamentos entre clientes, barbeiros, serviços e agendamentos.
    *   Script de inicialização (`init.sql`) com dados de exemplo (Seed).

---

## 📂 Estrutura do Projeto

O repositório está organizado da seguinte forma:

```text
ProjetoSistema/
├── front/              # Código-fonte da interface web
│   ├── index.html      # Página principal
│   ├── barbeiros.html  # Gestão de barbeiros
│   ├── clientes.html   # Gestão de clientes
│   ├── app.ts          # Lógica principal do frontend
│   └── styles.css      # Estilização global
└── server/             # Código-fonte da API (Backend)
    ├── src/
    │   ├── configs/    # Configurações de banco de dados e ambiente
    │   ├── database/   # Scripts SQL e inicialização
    │   ├── repositories/# Camada de acesso a dados (Padrão Repository)
    │   ├── useCases/   # Regras de negócio (Padrão Use Case)
    │   ├── routes.ts   # Definição das rotas da API
    │   └── index.ts    # Ponto de entrada do servidor
    └── .env            # Variáveis de ambiente
```

---

## 🛠️ Como Executar o Projeto

### **Pré-requisitos**
*   [Node.js](https://nodejs.org/) instalado.
*   [PostgreSQL](https://www.postgresql.org/) instalado e rodando.

### **1. Configuração do Banco de Dados**
1.  Crie um banco de dados chamado `barbearia_db`.
2.  Execute o script localizado em `server/src/database/init.sql` para criar as tabelas e inserir os dados iniciais.

### **2. Configuração do Backend**
1.  Acesse o diretório do servidor:
    ```bash
    cd server
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Configure o arquivo `.env` na raiz da pasta `server` com suas credenciais do PostgreSQL:
    ```env
    PORT=3000
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_NAME=barbearia_db
    ```
4.  Inicie o servidor em modo de desenvolvimento:
    ```bash
    npm run dev
    ```

### **3. Configuração do Frontend**
1.  Acesse o diretório do frontend:
    ```bash
    cd front
    ```
2.  Como o frontend utiliza TypeScript puro, você pode abrir os arquivos `.html` diretamente no navegador ou utilizar uma extensão como o **Live Server** no VS Code para uma melhor experiência.
    *   *Nota: Certifique-se de que o servidor backend esteja rodando para que a interface consiga buscar os dados.*

---

## 🛣️ Endpoints da API

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| **GET** | `/barbeiros` | Lista todos os barbeiros |
| **POST** | `/barbeiros` | Cria um novo barbeiro |
| **PUT** | `/barbeiros/atualizar/:id` | Atualiza os dados de um barbeiro |
| **DELETE** | `/barbeiros/:id` | Remove um barbeiro |
| **GET** | `/clientes` | Lista todos os clientes |
| **POST** | `/clientes` | Cadastra um novo cliente |
| **PUT** | `/clientes/:id` | Atualiza os dados de um cliente |
| **DELETE** | `/clientes/:id` | Remove um cliente |
| **GET** | `/agendamentos/hoje` | Lista os agendamentos do dia |

---

## 📄 Licença

Este projeto está sob a licença **ISC**.

---

## 👤 Autor

Desenvolvido por [P3droGs](https://github.com/P3droGs).
