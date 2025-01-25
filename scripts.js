document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const buttons = {
        crearParticipanteBtn: document.getElementById('crearParticipanteBtn'),
        crearVehiculoBtn: document.getElementById('crearVehiculoBtn'),
        crearCircuitoBtn: document.getElementById('crearCircuitoBtn'),
        asignarParticipanteBtn: document.getElementById('asignarParticipanteBtn'),
        iniciarCarreraBtn: document.getElementById('iniciarCarreraBtn')
    };

    const showSection = (sectionId) => {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        const sectionToShow = document.getElementById(sectionId);
        sectionToShow.classList.add('active');
    };

    // Navegación
    buttons.crearParticipanteBtn.addEventListener('click', () => showSection('section-participantes'));
    buttons.crearVehiculoBtn.addEventListener('click', () => showSection('section-vehiculos'));
    buttons.crearCircuitoBtn.addEventListener('click', () => showSection('section-circuito'));
    buttons.asignarParticipanteBtn.addEventListener('click', () => showSection('section-assignar'));
    buttons.iniciarCarreraBtn.addEventListener('click', () => showSection('section-carrera'));

    // Mostrar la primera sección por defecto
    showSection('section-carrera');
});