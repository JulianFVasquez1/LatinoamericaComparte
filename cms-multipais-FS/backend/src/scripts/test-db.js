import { supabaseAdmin } from '../config/supabase.js';

async function testDB() {
  console.log("Iniciando prueba de conexión a Supabase...");
  console.log("Intentando leer la tabla 'usuarios'...");
  
  const { data: usuarios, error } = await supabaseAdmin
    .from('usuarios')
    .select('id, username, email, estado, login_intentos, login_bloqueado_hasta');
    
  if (error) {
    console.error("❌ Error al conectar a Supabase o al leer la tabla:");
    console.error(error);
    process.exit(1);
  }
  
  console.log("✅ Conexión exitosa a Supabase.");
  console.log(`👥 Se encontraron ${usuarios.length} usuarios registrados.\n`);
  
  if (usuarios.length > 0) {
    console.table(usuarios);
  } else {
    console.log("La tabla 'usuarios' está vacía o las políticas de seguridad (RLS) están bloqueando la lectura.");
  }
  
  process.exit(0);
}

testDB();
