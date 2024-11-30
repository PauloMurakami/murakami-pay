-- Inserir roles na ordem especificada
-- 'usuario' com id 1
INSERT INTO public."role" (description)
VALUES ('usuario');

-- 'prestador' com id 2
INSERT INTO public."role" (description)
VALUES ('funcionario');

-- 'administrador' com id 3
INSERT INTO public."role" (description)
VALUES ('administrador');

-- Verificar as roles inseridas
SELECT * FROM public."role";