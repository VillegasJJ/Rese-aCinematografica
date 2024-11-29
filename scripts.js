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

});
