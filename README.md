# Proyecto de AD

## Balanceo de carga

Para distribuir el tráfico hacia el backend, se implementó un balanceador de carga NGINX con pesos asignados de la siguiente manera:

- **nodo1** (`app_backend_1`): Peso 3. Simula un servidor con mayor capacidad de CPU asignada.
- **nodo2** (`app_backend_2`): Peso 2. Simula un servidor con capacidad media.
- **nodo3** (`app_backend_3`): Peso 1. Simula un servidor con menor capacidad.

Esto significa que de cada 6 peticiones, 3 irán al nodo 1, 2 al nodo 2 y 1 al nodo 3. Esto se configura en `nginx/nginx.conf` utilizando el bloque `upstream` de NGINX.
