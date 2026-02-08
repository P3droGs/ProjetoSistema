CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================
-- DROP TABLES (ORDEM CORRETA)
-- =========================
DROP TABLE IF EXISTS bloqueios_agenda;
DROP TABLE IF EXISTS agendamentos;
DROP TABLE IF EXISTS servicos;
DROP TABLE IF EXISTS barbeiros;
DROP TABLE IF EXISTS clientes;

-- =========================
-- CLIENTES
-- =========================
CREATE TABLE clientes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- BARBEIROS
-- =========================
CREATE TABLE barbeiros (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- SERVIÇOS
-- =========================
CREATE TABLE servicos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    duracao_minutos INT NOT NULL,
    preco NUMERIC(10,2) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

-- =========================
-- AGENDAMENTOS
-- =========================
CREATE TABLE agendamentos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    cliente_id UUID,
    barbeiro_id UUID,
    servico_id UUID,

    data DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,

    status VARCHAR(20) DEFAULT 'agendado',
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_cliente
        FOREIGN KEY (cliente_id)
        REFERENCES clientes(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_barbeiro
        FOREIGN KEY (barbeiro_id)
        REFERENCES barbeiros(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_servico
        FOREIGN KEY (servico_id)
        REFERENCES servicos(id)
        ON DELETE SET NULL
);

-- =========================
-- SEED - BARBEIROS
-- =========================
INSERT INTO barbeiros (nome) VALUES
('João'),
('Carlos'),
('Marcos');

-- =========================
-- SEED - CLIENTES
-- =========================
INSERT INTO clientes (nome, telefone, email) VALUES
('Pedro Henrique', '11999999999', 'pedro@email.com'),
('Lucas Silva', '11988888888', 'lucas@email.com'),
('Mariana Souza', '11977777777', 'mariana@email.com');

-- =========================
-- SEED - SERVIÇOS
-- =========================
INSERT INTO servicos (nome, duracao_minutos, preco) VALUES
('Corte Masculino', 30, 35.00),
('Barba', 20, 25.00),
('Corte + Barba', 50, 55.00);

-- =========================
-- SEED - AGENDAMENTOS (HOJE)
-- =========================
INSERT INTO agendamentos (
    cliente_id,
    barbeiro_id,
    servico_id,
    data,
    hora_inicio,
    hora_fim,
    status
) VALUES
(
    (SELECT id FROM clientes WHERE nome = 'Pedro Henrique' LIMIT 1),
    (SELECT id FROM barbeiros WHERE nome = 'João' LIMIT 1),
    (SELECT id FROM servicos WHERE nome = 'Corte Masculino' LIMIT 1),
    CURRENT_DATE,
    '09:00',
    '09:30',
    'agendado'
),
(
    (SELECT id FROM clientes WHERE nome = 'Lucas Silva' LIMIT 1),
    (SELECT id FROM barbeiros WHERE nome = 'Carlos' LIMIT 1),
    (SELECT id FROM servicos WHERE nome = 'Barba' LIMIT 1),
    CURRENT_DATE,
    '10:00',
    '10:20',
    'confirmado'
),
(
    (SELECT id FROM clientes WHERE nome = 'Mariana Souza' LIMIT 1),
    (SELECT id FROM barbeiros WHERE nome = 'Marcos' LIMIT 1),
    (SELECT id FROM servicos WHERE nome = 'Corte + Barba' LIMIT 1),
    CURRENT_DATE,
    '11:00',
    '11:50',
    'agendado'
);
