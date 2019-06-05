insert into users (`id`, `email`, `hash`, `name`, `surname`) values
(100002, 'a@a.com', '{bcrypt}$2a$10$D/0V22sHAvsIXcimVIJ3T.55nFcrDWXHSSTDRsfSa5JKaCtNyn8zW', 'admin', 'admin', ); -- password: password

insert into user_roles (`user_id`, `roles`) values (100002, 'ROLE_ADMIN');