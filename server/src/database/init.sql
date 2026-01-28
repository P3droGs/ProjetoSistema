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
-- SEED
-- =========================
INSERT INTO barbeiros (nome) VALUES
('João'),
('Carlos'),
('Marcos');

INSERT INTO clientes (nome, telefone, email) VALUES
('Pedro Henrique', '11999999999', 'pedro@email.com'),
('Lucas Silva', '11988888888', 'lucas@email.com');

INSERT INTO servicos (nome, duracao_minutos, preco) VALUES
('Corte Masculino', 30, 35.00),
('Barba', 20, 25.00);

INSERT INTO agendamentos (
    cliente_id,
    barbeiro_id,
    servico_id,
    data,
    hora_inicio,
    hora_fim
) VALUES (
    (SELECT id FROM clientes LIMIT 1),
    (SELECT id FROM barbeiros LIMIT 1),
    (SELECT id FROM servicos LIMIT 1),
    CURRENT_DATE,
    '09:00',
    '09:30'
);
