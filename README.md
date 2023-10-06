## readme.so web para crear readmi

# NodePOP

Nodepop es un servicio de venta de artículos de segunda mano que proporciona una API desde la cuál se pueden consultar los anuncios disponibles usando diferentes filtros, así como crear anuncios nuevos.
También tiene una interfaz web desde la cuál se puede consultar de forma gráfica los anuncios disponibles.

## Requisitos

Asegúrate de tener instalados los siguientes requisitos en tu entorno de desarrollo:

- Node.js
- MongoDB

## Instalación

1. Ejecuta npm install para instalar las dependencias.
2. Configura las variables de entorno en un archivo .env con las siguientes variables:
    - PORT: El puerto en el que se ejecutará el servidor.
    - MONGODB_URI: La URL de conexión a la base de datos MongoDB.

## Inicio de la app

Modo producción:
```sh 
$npm start
```

Modod desarrollo:
```sh
$npm run dev
```

## Métodos

1. Listar Anuncios
Obtiene una lista de anuncios con filtros opcionales.

URL api: /api/productos
URL web: desde la propia raiz

Método: GET

- Parámetros de consulta:

skip (opcional): Número de página para paginación.
limit (opcional): Cantidad de anuncios por página.
tag (opcional): Filtro por etiqueta (ejemplo: work, lifestyle).
venta (opcional): Filtro por tipo de anuncio (venta o compra).
precio (opcional): Rango de precio del producto con el formato precioMin - PrecioMax.
nombre (opcional): Nombre del artículo (búsqueda por nombre).


API: http://localhost:3000//api/productos?skip=0&limit=3&tag=work&precio=100-500
Web: http://localhost:3000/?tag=lifestyle&precio=300-900&nombre=prueba&venta=true

2. Listar Tags
Obtiene una lista de etiquetas disponibles.

API: /api/productos/tags

Método: GET

--------------------

## Estructura de datos

{
  "nombre": "iPhone X",
  "tipo": "venta",
  "precio": 400,
  "foto": "url_de_la_foto.jpg",
  "tags": ["mobile"]
}

