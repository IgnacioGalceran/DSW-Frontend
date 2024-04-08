# Propuesta TP DSW

## Grupo:

### Integrantes:

- Legajo - Apellido(s), Nombre(s)

## Repositorios:

- Frontend: [Enlace al repositorio del frontend](https://github.com/IgnacioGalceran/DSW-Frontend)
- Backend: [Enlace al repositorio del backend](https://github.com/IgnacioGalceran/DSW-Backend)

## Tema:

**Gestión de Inventario para Pequeñas Empresas de Distribución**

## Descripción:

Una aplicación de gestión de inventario diseñada para pequeñas empresas de distribución, que les permite administrar eficientemente sus productos, proveedores y pedidos. Simplifica el seguimiento de inventario, la gestión de proveedores y la realización de pedidos.

## Modelo:

![Modelo de la Aplicación](Enlace-imagen-modelo)

## Alcance Funcional:

### Alcance Mínimo:

- **CRUD simple:**
  1. CRUD de Productos
  2. CRUD de Proveedores
  3. CRUD de Pedidos
- **CRUD dependiente:**
  1. CRUD de Detalles de Pedido {depende de} CRUD de Pedidos
- **Listado + detalle:**
  1. Listado de productos con detalles completos
  2. Listado de pedidos con detalles completos
- **CUU/Epic:**
  1. Realizar un nuevo pedido de productos
  2. Verificar el estado de un pedido

### Adicionales para Aprobación:

- **CRUD:**
  1. CRUD de Categorías de Productos
  2. CRUD de Clientes
- **CUU/Epic:**
  1. Generar informes de inventario
  2. Notificar al usuario cuando el stock de un producto esté bajo

## Alcance Adicional Voluntario:

- **Listados:**
  1. Historial de pedidos realizados
  2. Informe de productos más vendidos
- **CUU/Epic:**
  1. Procesar devoluciones de productos
  2. Integración de pagos para realizar pedidos directamente desde la aplicación
- **Otros:**
  1. Generar códigos de barras para los productos
  2. Escanear códigos de barras para realizar entradas/salidas de inventario
