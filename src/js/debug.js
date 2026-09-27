// Debug Console - Para diagnosticar problemas
// Abre DevTools (F12) y verifica que esto aparezca

console.log('✅ App iniciando...');

// Verificar que los archivos se cargan
setTimeout(() => {
  console.log('📁 Verificando elementos del DOM:');
  console.log('- #navbar-container:', document.querySelector('#navbar-container') ? '✓' : '✗');
  console.log('- #sidebar-container:', document.querySelector('#sidebar-container') ? '✓' : '✗');
  console.log('- #app:', document.querySelector('#app') ? '✓' : '✓');
  
  console.log('\n📊 Verificando servicios:');
  const userData = localStorage.getItem('current_user');
  console.log('- Usuario en localStorage:', userData ? '✓' : '✗');
  
  const clasesVisibles = document.querySelectorAll('.card');
  console.log('\n🎓 Clases renderizadas:', clasesVisibles.length, 'encontradas');
  
  console.log('\n☰ Botón hamburguesa:');
  const hamburger = document.getElementById('hamburger-btn');
  console.log('- Hamburger encontrado:', hamburger ? '✓' : '✗');
  if (hamburger) {
    console.log('- Evento click:', hamburger.onclick ? '✓' : 'sin evento directo');
  }
  
  console.log('\n✅ Debug completado - Si ves problemas, reporta lo anterior');
}, 1000);
