-- =========================
-- EXTENSÃO (UUID)
-- =========================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================
-- DROP TABLES (ORDEM CORRETA)
-- =========================
DROP TABLE IF EXISTS bloqueios_agenda CASCADE;
DROP TABLE IF EXISTS agendamentos CASCADE;
DROP TABLE IF EXISTS servicos CASCADE;
DROP TABLE IF EXISTS barbeiros CASCADE;
DROP TABLE IF EXISTS clientes CASCADE;

DROP TYPE IF EXISTS status_agendamento;

-- =========================
-- CLIENTES
-- =========================
CREATE TABLE clientes (
    id UUID PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- BARBEIROS
-- =========================
CREATE TABLE barbeiros (
    id UUID PRIMARY KEY,
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
    duracao_minutos INTEGER NOT NULL CHECK (duracao_minutos > 0),
    preco NUMERIC(10,2) NOT NULL CHECK (preco >= 0),
    ativo BOOLEAN DEFAULT TRUE
);

-- =========================
-- STATUS DO AGENDAMENTO
-- =========================
CREATE TYPE status_agendamento AS ENUM (
    'agendado',
    'confirmado',
    'cancelado',
    'concluido'
);

-- =========================
-- AGENDAMENTOS
-- =========================
CREATE TABLE agendamentos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    cliente_id UUID NOT NULL,
    barbeiro_id UUID NOT NULL,
    servico_id UUID NOT NULL,

    data DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,

    status status_agendamento DEFAULT 'agendado',
    observacoes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_cliente
        FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,

    CONSTRAINT fk_barbeiro
        FOREIGN KEY (barbeiro_id) REFERENCES barbeiros(id),

    CONSTRAINT fk_servico
        FOREIGN KEY (servico_id) REFERENCES servicos(id),

    CONSTRAINT chk_horario_valido
        CHECK (hora_fim > hora_inicio)
);

-- =========================
-- BLOQUEIOS DE AGENDA
-- =========================
CREATE TABLE bloqueios_agenda (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    barbeiro_id UUID NOT NULL,
    data DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,
    motivo VARCHAR(255),

    CONSTRAINT fk_barbeiro_bloqueio
        FOREIGN KEY (barbeiro_id) REFERENCES barbeiros(id) ON DELETE CASCADE,

    CONSTRAINT chk_bloqueio_horario
        CHECK (hora_fim > hora_inicio)
);

-- =========================
-- EVITAR CONFLITO DE HORÁRIOS
-- =========================
CREATE UNIQUE INDEX uk_agendamento_conflito
ON agendamentos (
    barbeiro_id,
    data,
    hora_inicio,
    hora_fim
)
WHERE status IN ('agendado', 'confirmado');

-- =========================
-- SEED: BARBEIROS (IDs FIXOS)
-- =========================
INSERT INTO barbeiros (id, nome) VALUES
('11111111-1111-1111-1111-111111111111', 'João'),
('22222222-2222-2222-2222-222222222222', 'Carlos'),
('33333333-3333-3333-3333-333333333333', 'Marcos');

-- =========================
-- SEED: CLIENTES (IDs FIXOS)
-- =========================
INSERT INTO clientes (id, nome, telefone, email) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Pedro Henrique', '11999999999', 'pedro@email.com'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Lucas Silva', '11988888888', 'lucas@email.com'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Mariana Souza', '11977777777', 'mariana@email.com'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'João Pedro', '11977777777', 'joaopedro@email.com');


-- =========================
-- SEED: SERVIÇOS
-- =========================
INSERT INTO servicos (nome, duracao_minutos, preco) VALUES
('Corte Masculino', 30, 35.00),
('Barba', 20, 25.00),
('Corte + Barba', 50, 55.00);
