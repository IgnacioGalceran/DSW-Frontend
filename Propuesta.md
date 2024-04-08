# Propuesta TP DSW

## Grupo

### Integrantes

-       - Fonseca, José
- 45337 - Galcerán, Ignacio Agustín
-       - Gómez, Fernando

### Repositorios

- [frontend app](https://github.com/IgnacioGalceran/DSW-Frontend)
- [backend app](https://github.com/IgnacioGalceran/DSW-Backend)

## Tema

### Descripción

Una aplicación de gestión de inventario diseñada para pequeñas empresas de distribución, que les permite administrar eficientemente sus productos, proveedores y pedidos. Simplifica el seguimiento de inventario, la gestión de proveedores y la realización de pedidos.

### Modelo

![imagen del modelo]()

## Alcance Funcional

### Alcance Mínimo

Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD de Productos<br>2. CRUD de Proveedores<br>3. CRUD de Pedidos|
|CRUD dependiente|1. CRUD de Detalles de Pedido {depende de} CRUD de Pedidos|
|Listado<br>+<br>detalle| 1. Listado de productos con detalles completos<br> 2. Listado de pedidos con detalles completos|
|CUU/Epic|1. Realizar un nuevo pedido de productos<br>2. Verificar el estado de un pedido|

### Adicionales para Aprobación

| Req      | Detalle                                                                                               |
| :------- | :---------------------------------------------------------------------------------------------------- |
| CRUD     | 1. CRUD de Categorías de Productos<br>2. CRUD de Clientes                                             |
| CUU/Epic | 1. Generar informes de inventario<br>2. Notificar al usuario cuando el stock de un producto esté bajo |

### Alcance Adicional Voluntario

_Nota_: El Alcance Adicional Voluntario es opcional, pero ayuda a que la funcionalidad del sistema esté completa y será considerado en la nota en función de su complejidad y esfuerzo.

| Req      | Detalle                                                                                                                       |
| :------- | :---------------------------------------------------------------------------------------------------------------------------- |
| Listados | 1. Historial de pedidos realizados<br>2. Informe de productos más vendidos                                                    |
| CUU/Epic | 1. Procesar devoluciones de productos<br>2. Integración de pagos para realizar pedidos directamente desde la aplicación       |
| Otros    | 1. Generar códigos de barras para los productos<br>2. Escanear códigos de barras para realizar entradas/salidas de inventario |
