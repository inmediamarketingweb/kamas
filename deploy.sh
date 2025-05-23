#!/bin/bash

echo "🚀 Haciendo git pull en /var/www/kamas.pe"
cd /var/www/kamas.pe || exit 1
git pull origin main

echo "📦 Instalando dependencias..."
npm install

echo "🧹 Eliminando carpeta build..."
sudo rm -rf /var/www/kamas.pe/build

echo "🏗️ Ejecutando build..."
npm run build

echo "🔒 Ajustando permisos..."
sudo chown -R www-data:www-data /var/www/kamas.pe
sudo chmod -R 755 /var/www/kamas.pe

echo "✅ ¡Despliegue completado!"
