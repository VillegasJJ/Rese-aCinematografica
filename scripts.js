$(document).ready(function () {

    $('.video-link').click(function (e) {
        e.preventDefault();

        var videoSrc = $(this).data('video-src');
        var description = $(this).data('description');

        // Modal content with YouTube iframe
        var modalContent = `
            <div class="modal-content">
                <iframe id="youtube-video" width="560" height="315" src="${videoSrc}?controls=0&showinfo=0&modestbranding=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <div class="info">${description}</div>
                <span class="close">&times;</span>
            </div>
        `;

        // Add the modal to the body and display it
        $('body').append(`<div class="modal">${modalContent}</div>`);
        $('.modal').fadeIn();

        // Function to toggle play/pause on click
        $('#youtube-video').click(function () {
            var iframe = $(this)[0];
            var player = new YT.Player(iframe);

            // Toggle play/pause
            if (player.getPlayerState() === YT.PlayerState.PLAYING) {
                player.pauseVideo();
            } else {
                player.playVideo();
            }
        });

        // Close the modal when clicking outside or on the close button
        $('.modal .close, .modal').click(function (e) {
            if ($(e.target).is('.modal, .close')) {
                $('.modal').fadeOut(function () {
                    $(this).remove();
                });
            }
        });
    });

    // script.js (No es necesario para la animación actual, pero útil si deseas agregar más interactividad en el futuro)
    document.addEventListener('DOMContentLoaded', () => {
        console.log("Página cargada, ¡listo para interactuar!");
        // Puedes agregar funcionalidades interactivas aquí en el futuro
    });

    //****************************************************************************/

    const ctx = document.getElementById('reviewsChart').getContext('2d');
    const reviewsChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Excelentes', 'Buenas', 'Regulares', 'Malas', 'Terribles'],
        datasets: [{
            label: '# de Opiniones',
            data: [45, 30, 15, 8, 2],
            backgroundColor: [
                'rgba(54, 162, 235, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(255, 205, 86, 0.7)',
                'rgba(255, 99, 132, 0.7)',
                'rgba(201, 203, 207, 0.7)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true, // Adapta al tamaño del contenedor
        maintainAspectRatio: false // Permite personalizar proporciones
    }
});

//****************************************************************************/
$(document).ready(function () {

    // Función para actualizar las críticas en el DOM en tiempo real
    function updateComments() {
        const commentsDisplay = document.querySelector('#comments-display');
        commentsDisplay.innerHTML = ''; // Limpiar el área antes de mostrar las críticas

        const reviews = JSON.parse(localStorage.getItem('reviews')) || []; // Recupera las críticas desde LocalStorage

        if (reviews.length > 0) {
            reviews.forEach((review, index) => {
                const commentItem = document.createElement('div');
                commentItem.classList.add('comment-item');
                commentItem.innerHTML = `
                    <p>${index + 1}. ${review}</p>
                    <button class="delete-comment" data-index="${index}">Eliminar</button>
                `;
                commentsDisplay.appendChild(commentItem);
            });
        } else {
            commentsDisplay.innerHTML = '<p>No hay críticas para mostrar.</p>';
        }
    }

    // Función para agregar una crítica
    document.querySelector('.submit-comment').addEventListener('click', () => {
        const reviewText = document.querySelector('#user-review').value;

        if (reviewText.trim()) {
            // Recupera las críticas almacenadas en LocalStorage (si existen)
            const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

            // Agrega la nueva crítica al arreglo
            reviews.push(reviewText);

            // Guarda el arreglo actualizado en LocalStorage
            localStorage.setItem('reviews', JSON.stringify(reviews));

            // Limpiar el textarea
            document.querySelector('#user-review').value = '';

            // Mostrar las críticas actualizadas inmediatamente
            updateComments();

            alert('¡Gracias por tu crítica!');
        } else {
            alert('Por favor, escribe una crítica antes de enviar.');
        }
    });

    // Función para eliminar una crítica
    document.querySelector('#comments-display').addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('delete-comment')) {
            const index = e.target.getAttribute('data-index'); // Obtiene el índice de la crítica a eliminar

            // Recupera las críticas desde LocalStorage
            let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

            // Elimina la crítica del arreglo
            reviews.splice(index, 1);

            // Actualiza el LocalStorage con el arreglo modificado
            localStorage.setItem('reviews', JSON.stringify(reviews));

            // Muestra las críticas actualizadas en la interfaz
            updateComments();
        }
    });

    // Cargar las críticas iniciales
    updateComments();
});


});
