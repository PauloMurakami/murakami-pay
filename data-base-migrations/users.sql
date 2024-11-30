-- Inserção de usuários (se ainda não tiver sido feito)
INSERT INTO public."user" (name, username, email, "password")
VALUES 
('Alice Silva', 'alice', 'alice@example.com', 'senha123'),
('Bob Santos', 'bob', 'bob@example.com', 'senha123'),
('Carlos Pereira', 'carlos', 'carlos@example.com', 'senha123'),
('Daniela Costa', 'daniela', 'daniela@example.com', 'senha123'),
('Eva Martins', 'eva', 'eva@example.com', 'senha123'),
('Fernando Oliveira', 'fernando', 'fernando@example.com', 'senha123'),
('Gabriela Souza', 'gabriela', 'gabriela@example.com', 'senha123'),
('Hugo Almeida', 'hugo', 'hugo@example.com', 'senha123'),
('Isabela Lima', 'isabela', 'isabela@example.com', 'senha123'),
('João Ferreira', 'joao', 'joao@example.com', 'senha123'),
('Paulo Murakami', 'Paulo', 'ppmura13@gmail.com', 'admin13')

-- Associações de usuários com múltiplas roles
INSERT INTO public.user_roles_role ("userId", "roleId")
VALUES
(1, 1), 
(1, 2), 
(2, 2), 
(2, 3), 
(3, 3), 
(3, 4), 
(4, 4), 
(5, 1), 
(5, 3), 
(6, 2), 
(7, 1), 
(7, 4), 
(8, 2), 
(9, 2), 
(10, 2),
(11, 3);

