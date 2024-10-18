// Inicializa EmailJS con tu User ID
emailjs.init('2TeZp6oxUjmZjOsKW');

// Configura el evento de envío del formulario
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevenir que el formulario se envíe automáticamente

    // Recolecta los datos del formulario
    const formData = new FormData(this);
    const templateParams = {
        from_name: formData.get('nombre'),
        from_email: formData.get('email'),
        subject: formData.get('asunto'),
        message: formData.get('mensaje')
    };

    // Validar los campos
    if (!templateParams.from_name || !templateParams.from_email || !templateParams.subject || !templateParams.message) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Envía el correo usando EmailJS
    emailjs.send('default_service', 'template_qqcj13v', templateParams)
        .then(function(response) {
            // Mostrar mensaje de éxito
            const successMessage = document.getElementById('successMessage');
            successMessage.style.display = 'block';

            // Limpiar el formulario
            document.getElementById('contactForm').reset();

            // Ocultar el mensaje de éxito después de 3 segundos
            setTimeout(function() {
                successMessage.style.display = 'none';
            }, 3000);
        })
        .catch(function(error) {
            console.error('Error al enviar el mensaje:', error);
            alert('Hubo un problema al enviar el mensaje. Inténtalo de nuevo más tarde.');
        });
});
