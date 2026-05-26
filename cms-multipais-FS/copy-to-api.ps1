# Script para copiar archivos del backend a la carpeta api/ para Vercel Serverless (Windows/PowerShell)

Write-Host "🚀 Iniciando copia de archivos del backend a api/..." -ForegroundColor Green

# Crear directorios si no existen
New-Item -ItemType Directory -Path "api/routes" -Force | Out-Null
New-Item -ItemType Directory -Path "api/services" -Force | Out-Null
New-Item -ItemType Directory -Path "api/controllers" -Force | Out-Null

# Copiar archivos de ROUTES
Write-Host "📁 Copiando routes..." -ForegroundColor Cyan
@(
  "authRoutes.js",
  "paisRoutes.js",
  "userRoutes.js",
  "noticiaRoutes.js",
  "testimonioRoutes.js",
  "solicitudRoutes.js",
  "auditRoutes.js",
  "archivoRoutes.js",
  "publicRoutes.js"
) | ForEach-Object {
  Copy-Item "backend/src/routes/$_" "api/routes/$_" -Force
  Write-Host "  ✓ $_" -ForegroundColor Green
}

# Copiar archivos de SERVICES
Write-Host "📁 Copiando services..." -ForegroundColor Cyan
@(
  "authService.js",
  "paisService.js",
  "userService.js",
  "noticiaService.js",
  "testimonioService.js",
  "solicitudService.js",
  "auditService.js",
  "archivoService.js",
  "publicService.js"
) | ForEach-Object {
  Copy-Item "backend/src/services/$_" "api/services/$_" -Force
  Write-Host "  ✓ $_" -ForegroundColor Green
}

# Copiar archivos de CONTROLLERS
Write-Host "📁 Copiando controllers..." -ForegroundColor Cyan
@(
  "authController.js",
  "paisController.js",
  "userController.js",
  "noticiaController.js",
  "testimonioController.js",
  "solicitudController.js",
  "auditController.js",
  "archivoController.js",
  "publicController.js"
) | ForEach-Object {
  Copy-Item "backend/src/controllers/$_" "api/controllers/$_" -Force
  Write-Host "  ✓ $_" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ ¡Copia completada!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Yellow
Write-Host "1. Actualiza frontend/src/api/axiosClient.js con VITE_API_URL"
Write-Host "2. Sube todo a GitHub: git add . && git commit -m 'Vercel setup' && git push"
Write-Host "3. Conecta el repo a Vercel (vercel.com)"
Write-Host "4. Añade las variables de entorno en Vercel Settings"
Write-Host "5. ¡Deploy!"
