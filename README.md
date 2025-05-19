# Kamas

[![Version](https://img.shields.io/npm/v/kamas)](https://www.npmjs.com/package/kamas)  
[![Build Status](https://img.shields.io/github/actions/workflow/status/inmediamarketingweb/kamas/deploy.yml?branch=main)](https://github.com/inmediamarketingweb/kamas/actions)  
[![License](https://img.shields.io/github/license/inmediamarketingweb/kamas)](LICENSE)

## Descripción

**Kamas** es una aplicación de e‑commerce que permite a los usuarios navegar productos por categoría y subcategoría, seleccionar distrito de envío y tipos de envío (Express, Standard, Pickup), y calcular dinámicamente el costo según un archivo JSON de tarifas. :contentReference[oaicite:1]{index=1}

Visita la demo en vivo: [kamas.pe](https://kamas.pe)

## Características

- Navegación por categorías y subcategorías  
- Selección de distrito y tipo de envío con cálculo automático de costos  
- Integración con JSON externo para tarifas de envío  
- Interfaz responsive y accesible  
- Despliegue automático con GitHub Actions

## Capturas de pantalla

![Pantalla de productos](./docs/screenshots/productos.png)  
![Selección de envío](./docs/screenshots/envio.png)

## Instalación

1. Clona el repositorio  
   ```bash
   git clone https://github.com/inmediamarketingweb/kamas.git
   cd kamas

2. Instalar dependencias
   ```bash
    npm install

3. Ejecutar modo de desarrollo
   ```bash
    npm start

## Arquitectura

kamas/
├── public/                  # Assets estáticos
│   └── 
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
