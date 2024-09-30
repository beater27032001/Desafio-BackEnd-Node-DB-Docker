create database resume_ai;

CREATE TABLE "usuarios" (
    "id" serial NOT NULL,
    "nome" text NOT NULL,
    "email" text NOT NULL,
    "senha" text NOT NULL,
    PRIMARY KEY ("id"),
    CONSTRAINT "email_unique_constrains" UNIQUE ("email")
);

CREATE TABLE "materias" (
    "id" serial NOT NULL,
    "nome" text NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE "resumos" (
    "id" serial NOT NULL,
    "usuario_id" int4,
    "materia_id" int4,
    "titulo" text,
    "topicos" text NOT NULL,
    "descricao" text,
    "criado" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    CONSTRAINT "fk_resumos_usuarios_1" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id"),
    CONSTRAINT "fk_resumos_materias_2" FOREIGN KEY ("materia_id") REFERENCES "materias" ("id")
);

INSERT INTO materias (nome) VALUES 
('Back-end'), 
('Front-end'), 
('Carreira'), 
('Mobile'), 
('Design'), 
('Dados'), 
('SQL');

SELECT EXISTS(SELECT 1 FROM usuarios where email = 'email@exemplo.com');

INSERT INTO usuarios (nome, email, senha)
VALUES ('exemplo', 'email@exemplo.com', '123');

INSERT INTO resumos (usuario_id, materia_id, topicos, descricao) 
VALUES (1, 1, 'Tópicos do Resumo', 'Descrição detalhada do resumo');

SELECT * FROM materias;

SELECT * FROM resumos WHERE usuario_id = 1;

SELECT * FROM resumos WHERE usuario_id = 1 AND materia_id = 1;

SELECT EXISTS(SELECT 1 FROM resumos WHERE usuario_id = 1 AND materia_id = 1);

UPDATE resumos 
SET usuario_id = 1, materia_id = 1, topicos = 'Novos Tópicos', descricao = 'Nova Descrição'
WHERE id = 1;

DELETE FROM resumos WHERE id = 1;

SELECT COUNT(*) 
FROM resumos 
WHERE EXTRACT(MONTH FROM criado) = 9 AND EXTRACT(YEAR FROM criado) = 2024;