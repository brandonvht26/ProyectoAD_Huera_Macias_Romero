-- Ejecutar en db-master
CREATE USER 'replica_user'@'%' IDENTIFIED WITH mysql_native_password BY '000000';

GRANT REPLICATION SLAVE ON *.* TO 'replica_user'@'%';

FLUSH PRIVILEGES;



