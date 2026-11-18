# Desserts

Aplicación web para explorar y administrar un catálogo de postres.
Permite consultar productos, buscar por nombre, filtrar por categoría,
navegar entre páginas, ver el detalle de cada producto y gestionar un
carrito de compras. También incluye operaciones CRUD para administrar
los productos.

## Características

### Catálogo de productos

-   Consulta de productos desde la API local.
-   Búsqueda de productos por nombre.
-   Filtro por categoría.
-   Paginación desde la API, con un máximo de 8 productos por página.
-   Skeletons durante la carga y estados de error y resultados vacíos.
-   Vista de detalle para cada producto.
-   Página 404 para rutas o productos inexistentes.

### Administración de productos

-   Creación de productos.
-   Edición de productos existentes.
-   Eliminación de productos con confirmación.
-   Formularios gestionados con React Hook Form.
-   Validación de datos mediante Zod.
-   Notificaciones de éxito y error con Sonner.

Los campos del producto son: - Nombre. - Categoría. - Precio mayor que
cero. - Imagen thumbnail (obligatoria). - Imagen mobile (obligatoria). -
Imagen desktop (obligatoria). - Imagen tablet (opcional).

### Carrito de compras

-   Agregar productos al carrito.
-   Incrementar y disminuir cantidades.
-   Eliminar productos del carrito.
-   Calcular subtotales y total del pedido.
-   Confirmar el pedido y limpiar el carrito.
-   Persistencia del carrito en el navegador mediante Zustand y
    `localStorage`.

## Tecnologías utilizadas

  Tecnología        Uso
  ----------------- ----------------------------------------
  React             Construcción de la interfaz
  TypeScript        Tipado estático
  Vite              Entorno de desarrollo y build
  Tailwind CSS      Estilos de la interfaz
  React Router      Navegación entre páginas
  Axios             Peticiones HTTP
  TanStack Query    Consultas, mutaciones y caché de datos
  Zustand           Estado global del carrito
  React Hook Form   Gestión de formularios
  Zod               Validación de formularios
  Sonner            Notificaciones toast
  json-server       API REST local

## Requisitos previos

-   Node.js instalado (versión compatible con Vite 8).
-   npm.
-   Git (opcional, para clonar el repositorio).

## Instalación

1.  Clona el repositorio:

    ``` bash
    git clone <URL_DEL_REPOSITORIO>
    ```

2.  Ingresa a la carpeta del proyecto:

    ``` bash
    cd desserts-frontend
    ```

3.  Instala las dependencias:

    ``` bash
    npm install
    ```

## Ejecución en entorno local

La aplicación utiliza dos procesos: el servidor de la API
(`json-server`) y el servidor de desarrollo de Vite. Deben ejecutarse en
terminales separadas.

### 1. Iniciar la API local

En una primera terminal, ejecuta:

``` bash
npm run server
```

Este comando inicia `json-server` en el puerto `3000`, utilizando
`db.json` como fuente de datos.

La API estará disponible en:

``` text
http://localhost:3000
```

### 2. Iniciar el frontend

En una segunda terminal, desde la raíz del proyecto, ejecuta:

``` bash
npm run dev
```

Vite mostrará en la terminal la dirección local de la aplicación. Por
defecto, suele ser:

``` text
http://localhost:5173
```

Abre esa dirección en el navegador.

> **Importante:** inicia primero `json-server` y mantenlo ejecutándose
> mientras utilizas la aplicación. El frontend realiza sus peticiones a
> `http://localhost:3000`.

## Scripts disponibles

  -----------------------------------------------------------------------
  Comando                             Descripción
  ----------------------------------- -----------------------------------
  `npm run dev`                       Inicia el servidor de desarrollo de
                                      Vite

  `npm run server`                    Inicia json-server en el puerto
                                      3000

  `npm run build`                     Ejecuta la comprobación de
                                      TypeScript y genera el build de
                                      producción

  `npm run preview`                   Sirve localmente el build generado

  `npm run lint`                      Ejecuta ESLint
  -----------------------------------------------------------------------

Para generar el build:

``` bash
npm run build
```

Los archivos de producción se generan en la carpeta `dist/`.

## API local

La API utiliza `json-server` y obtiene sus datos del archivo `db.json`,
ubicado en la raíz del proyecto.

### Endpoints de productos

  Método   Endpoint          Descripción
  -------- ----------------- -----------------------------------
  GET      `/products`       Obtiene productos
  GET      `/products/:id`   Obtiene el detalle de un producto
  POST     `/products`       Crea un producto
  PATCH    `/products/:id`   Actualiza un producto
  DELETE   `/products/:id`   Elimina un producto

### Búsqueda, filtros y paginación

La consulta de productos admite parámetros para buscar por nombre,
filtrar por categoría y paginar resultados.

Ejemplo de paginación:

``` http
GET /products?_page=1&_per_page=8
```

Ejemplo de búsqueda por nombre:

``` http
GET /products?name:contains=waffle&_page=1&_per_page=8
```

Ejemplo de filtro por categoría:

``` http
GET /products?category=Cake&_page=1&_per_page=8
```

La respuesta paginada de json-server contiene metadatos como `first`,
`prev`, `next`, `last`, `pages` e `items`, además del arreglo de
productos en `data`.

### Endpoints de categorías

  Método   Endpoint        Descripción
  -------- --------------- ------------------------------------
  GET      `/categories`   Obtiene las categorías disponibles

Las categorías iniciales están definidas en la colección `categories` de
`db.json`.

## Estructura del proyecto

``` text
desserts-frontend/
├── public/
│   └── assets/
│       └── images/          # Imágenes e iconos de la aplicación
├── src/
│   ├── components/          # Componentes reutilizables
│   ├── hooks/               # Hooks de TanStack Query
│   ├── pages/               # Páginas de la aplicación
│   ├── schemas/             # Esquemas de validación con Zod
│   ├── services/            # Configuración de Axios y servicios HTTP
│   ├── stores/              # Estado global con Zustand
│   ├── types/               # Interfaces y tipos de TypeScript
│   ├── App.tsx              # Configuración de rutas
│   ├── main.tsx             # Punto de entrada y proveedores
│   └── index.css            # Estilos globales
├── db.json                  # Datos iniciales de json-server
├── package.json
└── vite.config.ts
```

## Rutas de la aplicación

  Ruta                  Descripción
  --------------------- ------------------------
  `/`                   Catálogo de productos
  `/producto/:id`       Detalle de un producto
  Cualquier otra ruta   Página 404

## Despliegue en Netlify

El frontend está preparado para generar una versión de producción con:

``` bash
npm run build
```

Configuración de compilación de Netlify:

  Configuración       Valor
  ------------------- -----------------
  Build command       `npm run build`
  Publish directory   `dist`

La aplicación utiliza React Router. Para que Netlify pueda resolver las
rutas de una Single Page Application al acceder directamente a una ruta
interna, agrega el archivo `public/_redirects` con este contenido:

``` text
/*    /index.html   200
```

### Consideración sobre la API

En la configuración actual, `src/services/api.ts` utiliza
`http://localhost:3000` como `baseURL`. Por ello, el frontend desplegado
en Netlify no puede comunicarse con el `json-server` que se ejecuta
únicamente en la computadora del desarrollador o evaluador.

El despliegue en Netlify publica el frontend, pero **no publica la API
local**. Para probar las operaciones que dependen de productos y
categorías, se debe ejecutar `npm run server` y utilizar el frontend en
el entorno local. Para que el sitio público pueda consultar y modificar
datos, sería necesario que la API estuviera disponible en una dirección
accesible desde internet y configurar Axios con esa dirección.

## Persistencia de datos

-   `json-server` utiliza `db.json` como almacenamiento local de
    productos y categorías.
-   Zustand utiliza `localStorage` para conservar el carrito en el
    navegador mediante la clave `dessert-cart`.
-   Los cambios realizados mediante el CRUD modifican el archivo
    `db.json` mientras la API local está ejecutándose.

## Autor

Diego Ramírez
