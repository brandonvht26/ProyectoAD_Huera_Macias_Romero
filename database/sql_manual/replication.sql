-- Ejecutar en db-master
SHOW MASTER STATUS; -- Agarrar datos

-- Ejecutar en db-slave
STOP REPLICA;
RESET REPLICA ALL;

CHANGE REPLICATION SOURCE TO
  SOURCE_HOST='db-master',
  SOURCE_USER='replica_user',
  SOURCE_PASSWORD='000000',
  SOURCE_LOG_FILE='mysql-bin.000003', -- Cambiar el file
  SOURCE_LOG_POS=6483; -- Cambiar la position

START REPLICA;

SHOW REPLICA STATUS;