insert into users (`id`, `email`, `hash`, `name`, `surname`) values
(100002, 'a@a.com', '{bcrypt}$2a$10$D/0V22sHAvsIXcimVIJ3T.55nFcrDWXHSSTDRsfSa5JKaCtNyn8zW', 'admin', 'admin', ), -- password: password
(100001, 'b@b.com', '{bcrypt}$2a$10$D/0V22sHAvsIXcimVIJ3T.55nFcrDWXHSSTDRsfSa5JKaCtNyn8zW', 'user', 'user', ); -- password: password

insert into user_roles (`user_id`, `roles`) values (100002, 'ROLE_ADMIN');
insert into user_roles (`user_id`, `roles`) values (100001, 'ROLE_USER');

insert into payments (`id`, `payer_id`, `amount`, `date`) values (424242, 100001, 2000, '2019-06-10');
