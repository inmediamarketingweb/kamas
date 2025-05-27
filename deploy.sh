#!/bin/bash

echo "🚀 Haciendo reset y git pull en /var/www/kamas.pe"
cd /var/www/kamas.pe || exit 1

# Descartar todos los cambios locales
git reset --hard
git clean -fd
git pull origin main

echo "📦 Instalando dependencias..."
npm install

echo "🧹 Eliminando carpeta build..."
sudo rm -rf /var/www/kamas.pe/build

echo "🏗️ Ejecutando build..."
npm run build

echo "🔒 Ajustando permisos..."
sudo chown -R www-data:www-data /var/www/kamas.pe
sudo chmod -R 777 /var/www/kamas.pe

echo "Moviendo .htaccess a la carpeta build..."
sudo mv /var/www/kamas.pe/.htaccess /var/www/kamas.pe/build/.htaccess

echo "✅ ¡Despliegue completado!"
