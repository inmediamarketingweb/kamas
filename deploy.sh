#!/bin/bash

echo "🚀 Haciendo git pull en /opt/proyectos/kamas..."
cd /opt/proyectos/kamas || exit 1
git pull

echo "📦 Instalando dependencias..."
npm install

echo "🛠️ Construyendo proyecto (npm run build)..."
npm run build

echo "🧹 Limpiando /var/www/kamas..."
sudo rm -rf /var/www/kamas/*

echo "📂 Copiando build a /var/www/kamas..."
sudo cp -r /opt/proyectos/kamas/build/* /var/www/kamas/

echo "🔒 Ajustando permisos..."
sudo chown -R www-data:www-data /var/www/kamas
sudo chmod -R 755 /var/www/kamas

echo "✅ ¡Despliegue completado!"
