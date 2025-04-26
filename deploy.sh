#!/bin/bash

echo "🚀 Haciendo git pull en /opt/proyectos/leosoplapuco..."
cd /opt/proyectos/leosoplapuco || exit 1
git pull

echo "📦 Instalando dependencias..."
npm install

echo "🛠️ Construyendo proyecto (npm run build)..."
npm run build

echo "🧹 Limpiando /var/www/leosoplapuco..."
sudo rm -rf /var/www/leosoplapuco/*

echo "📂 Copiando build a /var/www/leosoplapuco..."
sudo cp -r /opt/proyectos/leosoplapuco/build/* /var/www/leosoplapuco/

echo "🔒 Ajustando permisos..."
sudo chown -R www-data:www-data /var/www/leosoplapuco
sudo chmod -R 755 /var/www/leosoplapuco

echo "✅ ¡Despliegue completado!"
