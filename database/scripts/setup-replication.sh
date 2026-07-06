#!/bin/bash
set -e

echo "Esperando a que db-master acepte conexiones..."
until mysql -h db-master -uroot -prootpassword -e "SELECT 1" >/dev/null 2>&1; do
  sleep 2
done

echo "Esperando a que db-slave acepte conexiones..."
until mysql -h db-slave -uroot -prootpassword -e "SELECT 1" >/dev/null 2>&1; do
  sleep 2
done

echo "Verificando si la replicación ya está configurada..."
RUNNING=$(mysql -h db-slave -uroot -prootpassword -N -e "SHOW REPLICA STATUS\G" 2>/dev/null | grep -c "Replica_IO_Running: Yes" || true)

if [ "$RUNNING" -ge "1" ]; then
  echo "La replicación ya está activa. No se hace nada."
  exit 0
fi

echo "Configurando el slave para replicar desde db-master..."
mysql -h db-slave -uroot -prootpassword -e "
  STOP REPLICA;
  CHANGE REPLICATION SOURCE TO
    SOURCE_HOST='db-master',
    SOURCE_USER='repl',
    SOURCE_PASSWORD='replpassword',
    SOURCE_AUTO_POSITION=1;
  START REPLICA;
"

sleep 3
echo "Estado final de la replicación:"
mysql -h db-slave -uroot -prootpassword -e "SHOW REPLICA STATUS\G"
