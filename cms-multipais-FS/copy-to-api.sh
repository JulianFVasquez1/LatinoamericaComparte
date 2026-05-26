#!/bin/bash

# Script para copiar archivos del backend a la carpeta api/ para Vercel Serverless

echo "🚀 Iniciando copia de archivos del backend a api/..."

# Crear directorios si no existen
mkdir -p api/routes
mkdir -p api/services
mkdir -p api/controllers

# Copiar archivos de ROUTES
echo "📁 Copiando routes..."
cp backend/src/routes/authRoutes.js api/routes/
cp backend/src/routes/paisRoutes.js api/routes/
cp backend/src/routes/userRoutes.js api/routes/
cp backend/src/routes/noticiaRoutes.js api/routes/
cp backend/src/routes/testimonioRoutes.js api/routes/
cp backend/src/routes/solicitudRoutes.js api/routes/
cp backend/src/routes/auditRoutes.js api/routes/
cp backend/src/routes/archivoRoutes.js api/routes/
cp backend/src/routes/publicRoutes.js api/routes/

# Copiar archivos de SERVICES
echo "📁 Copiando services..."
cp backend/src/services/authService.js api/services/
cp backend/src/services/paisService.js api/services/
cp backend/src/services/userService.js api/services/
cp backend/src/services/noticiaService.js api/services/
cp backend/src/services/testimonioService.js api/services/
cp backend/src/services/solicitudService.js api/services/
cp backend/src/services/auditService.js api/services/
cp backend/src/services/archivoService.js api/services/
cp backend/src/services/publicService.js api/services/

# Copiar archivos de CONTROLLERS
echo "📁 Copiando controllers..."
cp backend/src/controllers/authController.js api/controllers/
cp backend/src/controllers/paisController.js api/controllers/
cp backend/src/controllers/userController.js api/controllers/
cp backend/src/controllers/noticiaController.js api/controllers/
cp backend/src/controllers/testimonioController.js api/controllers/
cp backend/src/controllers/solicitudController.js api/controllers/
cp backend/src/controllers/auditController.js api/controllers/
cp backend/src/controllers/archivoController.js api/controllers/
cp backend/src/controllers/publicController.js api/controllers/

echo "✅ ¡Copia completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Actualiza frontend/src/api/axiosClient.js con VITE_API_URL"
echo "2. Sube todo a GitHub: git push"
echo "3. Conecta el repo a Vercel"
echo "4. Añade las variables de entorno en Vercel Settings"
echo "5. ¡Deploy!"
