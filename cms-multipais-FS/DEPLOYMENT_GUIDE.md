# Guía de Deployer en Vercel - Opción 2 (Full-Stack Serverless)

## ✅ Lo que ya hemos hecho:

1. ✅ Creado `vercel.json` con la configuración
2. ✅ Creado `api/index.js` - handler principal de Express
3. ✅ Creado `api/package.json` - dependencias del API
4. ✅ Copiado `api/config/supabase.js`
5. ✅ Copiado `api/middlewares/` - authMiddleware.js y uploadMiddleware.js
6. ✅ Creado `.env.example` - plantilla de variables

## ⏳ Lo que necesitas completar:

### 1. Copiar TODOS los archivos del backend/src/ a api/

**Archivos de ROUTES que faltan copiar:**
```
backend/src/routes/ → api/routes/
- authRoutes.js
- paisRoutes.js
- userRoutes.js
- noticiaRoutes.js
- testimonioRoutes.js
- solicitudRoutes.js
- auditRoutes.js
- archivoRoutes.js
- publicRoutes.js
```

**Archivos de SERVICES que faltan copiar:**
```
backend/src/services/ → api/services/
- authService.js
- paisService.js
- userService.js
- noticiaService.js
- testimonioService.js
- solicitudService.js
- auditService.js
- archivoService.js
- publicService.js
```

**Archivos de CONTROLLERS que faltan copiar:**
```
backend/src/controllers/ → api/controllers/
- authController.js
- paisController.js
- userController.js
- noticiaController.js
- testimonioController.js
- solicitudController.js
- auditController.js
- archivoController.js
- publicController.js
```

### 2. Actualizar el Frontend

**En `frontend/src/api/axiosClient.js`:**
```javascript
// Cambiar de:
// baseURL: 'http://localhost:3001'

// A:
const API_URL = process.env.VITE_API_URL || 'http://localhost:3001';
export default axios.create({
  baseURL: API_URL,
  withCredentials: true
});
```

**En `frontend/.env` (crear si no existe):**
```
VITE_API_URL=https://your-project.vercel.app
```

### 3. Configurar Vercel

**Pasos:**

1. **Sube todo a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Prepare for Vercel deployment"
   git remote add origin https://github.com/tu-usuario/tu-repo.git
   git push -u origin main
   ```

2. **En vercel.com:**
   - Click "Add New" → "Project"
   - Conecta tu repositorio GitHub
   - Selecciona el repo

3. **Configurar el proyecto:**
   - **Root Directory:** Dejar en blanco (automático)
   - **Framework Preset:** Other
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Output Directory:** `frontend/dist`
   - **Install Command:** `npm install --workspaces`

4. **Variables de entorno** (en Vercel Settings → Environment Variables):
   ```
   SUPABASE_URL=tu_supabase_url
   SUPABASE_ANON_KEY=tu_anon_key
   SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
   JWT_SECRET=tu_jwt_secret_seguro
   FRONTEND_URL=https://tu-proyecto.vercel.app
   NODE_ENV=production
   ```

### 4. Opción: Usar un script automatizado

Para copiar rápidamente todos los archivos, ejecuta en PowerShell:

```powershell
# Copiar routes
Copy-Item "backend/src/routes/*" "api/routes/" -Force

# Copiar services
Copy-Item "backend/src/services/*" "api/services/" -Force

# Copiar controllers
Copy-Item "backend/src/controllers/*" "api/controllers/" -Force
```

## 📊 Estructura final esperada:

```
cms-multipais-FS/
├── api/
│   ├── config/
│   │   └── supabase.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── paisRoutes.js
│   │   └── ... (9 archivos totales)
│   ├── services/
│   │   ├── authService.js
│   │   ├── paisService.js
│   │   └── ... (9 archivos totales)
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── paisController.js
│   │   └── ... (9 archivos totales)
│   ├── index.js (MAIN HANDLER)
│   └── package.json
├── frontend/
│   └── ... (sin cambios)
├── backend/
│   └── ... (ya no necesario en Vercel)
├── vercel.json
├── .env.example
└── package.json (root)
```

## 🚀 Después del Deploy

1. Ve a `https://tu-proyecto.vercel.app`
2. El frontend se sirve desde Vercel
3. Las rutas `/api/*` se envían a las serverless functions
4. Las rutas públicas (como `/api/public/...`) funcionan sin autenticación
5. Las rutas protegidas validan el JWT automáticamente

## 🐛 Troubleshooting

Si obtienes errores:

1. **Error de módulos no encontrados:**
   - Asegúrate de que `api/package.json` tenga todas las dependencias
   - Ejecuta `npm install` en la raíz

2. **Error de variables de entorno:**
   - Verifica que las variables estén en Vercel Settings
   - Redeploy después de agregar variables

3. **CORS errors:**
   - Vercel automáticamente mapea `/api/*` al `api/index.js`
   - No necesitas configurar CORS especial

4. **Performance issues:**
   - Las cold starts son normales (< 5s la primera vez)
   - Supabase también puede tener latencia si está lejos

## ✨ Beneficios de esta configuración

✅ Full-stack en una sola URL  
✅ No requiere servidor de backend separado  
✅ Auto-escalable  
✅ Integración perfecta con Vercel  
✅ Mismo dominio para frontend y API  
✅ Deployments automáticos desde GitHub  

---

¿Necesitas ayuda copiar los archivos? Puedo hacerlo por ti.
