# Kamas

[![Version](https://img.shields.io/npm/v/kamas)](https://www.npmjs.com/package/kamas)  
[![Build Status](https://img.shields.io/github/actions/workflow/status/inmediamarketingweb/kamas/deploy.yml?branch=main)](https://github.com/inmediamarketingweb/kamas/actions)  
[![License](https://img.shields.io/github/license/inmediamarketingweb/kamas)](LICENSE)

## Descripción

- Sitio web oficial de la empresa fabricante de muebles "Kamas" que les permite a los usuarios navegar y ver los diferentes productos de la empresa.
- Este proyecto sigue en etapa de desarrollo por lo que puede presentar algunas incogruencias en su funcionalidad, diseño o productos.
- Visita el sitio web oficial: [kamas.pe](https://kamas.pe)

## Características

- Navegación por categorías y subcategorías  
- Selección de distrito y tipo de envío con cálculo automático de costos
- Integración con JSON externo para tarifas de envío
- Interfaz responsive y accesible  
- Despliegue automático con GitHub Actions

## Instalación

1. Clona el repositorio  
   ```bash
   git clone https://github.com/inmediamarketingweb/kamas.git

2. Instalar dependencias
   ```bash
    npm install

3. Ejecutar modo de desarrollo
   ```bash
    npm start

## Arquitectura

kamas/
├── public/                   # Assets estáticos
├── src/
│   ├── Componentes/          # Componentes React reutilizables
│   ├── Paginas/              # Páginas principales
│   └── App.js                # Rutas del proyecto
├── deploy.sh                 # Script de despliegue en producción
├── package.json
└── README.md

## Tecnologías

1. React
2. HTML
3. CSS

## Ayuda y soporte

1. inmediamarketingweb@gmail.com
2. leonardosoplapuco@gmail.com
