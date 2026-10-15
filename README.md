# Explorer App — Countries Explorer

Es una aplicacion por le cual una persona puede acceder a ver informacion de cualquier pais del mundo, para obtener informacion sobre, capital, poblacion, moneda, idioma, etc. 

===

# Características Principales
Stack de tecnología: 
Framework == vite 
Lenguajes == TypeScrript, HTML y CSS
Estilos == Tailwind CSS V4
Logica UI == Esta es manipulacion directa del DOM y componentes de TypeScript
Despliege == Vercel 
Stack de tecnología: Framework == vite; Lenguajes == TypeScrript, HTML y CSS; Estilos == Tailwind CSS V4; Logica UI == Esta es manipulacion directa del DOM y componentes de TypeScript; Despliege == Vercel 

Caracteristicas principales: 

- Diseño Adaptable e Interactivo: Tarjetas de países de forma independiente a su contenedor (`@container`).
- Tipografía Fluida: Implementación de `clamp()` para escalado automático de títulos y nombres de países sin perder legibilidad ni romper la maquetación.
- Búsqueda y Filtrado Dinámico:
    - Búsqueda en tiempo real por nombre de país con optimización de rendimiento vía `debounce`.
    - Filtro interactivo por región geográfica (África, América, Asia, Europa, Oceanía).
- Control de Carga Inicial: Muestra de forma predeterminada 8 países sugeridos en el inicio para mejorar los tiempos de respuesta y la experiencia del usuario.
- Navegación sin recarga (SPA): Enrutamiento por Hash.
- Manejo de Errores y Fallbacks: Control de imágenes rotas con SVGs de reserva (*placeholder*) y mensajes de estado para la carga y falta de conexión.

===

# Stack Tecnológico y Componentes

# Tecnologías:
- Framework/Bundler: [Vite](https://vitejs.org/)
- Lenguaje: [TypeScript](https://www.typescriptlang.org/)
- Estilos: [Tailwind CSS v4](https://tailwindcss.com/)
- Gestor de Paquetes: `pnpm` (compatible con `npm` / `yarn`)
- Despliegue: [Vercel](https://vercel.com/)

# Estructura de Componentes y Módulos:
- `src/main.ts`: Punto de entrada de la aplicación, inicialización de eventos y control del Router por Hash.
- `src/render/countryCard.ts`: Componente encargado de renderizar la tarjeta individual de cada país (`<article>`).
- `src/render/countryGrid.ts`: Módulo que renderiza la cuadrícula (*grid*) responsive de tarjetas.
- `src/render/detail.ts`: Vista detallada con información extendida del país seleccionado.
- `src/render/states.ts`: Componentes de estado para interfaces de carga (*loading*), lista vacía y mensajes de error.
- `src/api/countries.ts`: Servicio de consumo de datos desde la fuente local (`countries.json`).
- `src/utils/format.ts`: Funciones de utilidad (`debounce`, formateo de población, extracción segura de capitales y banderas).

===

# Requisitos Previos e Instalación

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior) y tu gestor de paquetes preferido (`pnpm`, `npm` o `yarn`).

# Pasos para la ejecución local:

# Clonar el repositorio:
    ```bash
    git clone [https://github.com/edgarbma/explorer-app.git](https://github.com/edgarbma/explorer-app.git)
    cd explorer-app

Dependencias: - pnpm install
Servidor: - pnpm dev

Compilar: pnpm build
Previo_Local: pnpm preview

# Enlaces del proyecto:
Repositorio_GitHub: ["Repositorio"](https://github.com/edgarbma/explorer-app.git)
Pull_Request: ["GitHub Flow"](https://github.com/edgarbma/explorer-app/pull/1)
Despliegue_Vercel: ["Vercel"](https://explorer-app-five.vercel.app/)
Ejecutar el servicio de desaarrollo:
pnpm dev
pnpm dev
