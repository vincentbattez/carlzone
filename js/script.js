jQuery(document).ready(function($) {
    var colorPrimary = $('.active').css('color');
    // rgb(203, 93, 93)
    var gradientPrimary = $('.overlay').css('background-image');
    // linear-gradient(to top left, rgba(203, 93, 93, 0.5) 0%, rgba(9, 38, 91, 0.5) 100%)
    var music = document.getElementById('music-sound');
    var lienSound = document.getElementById('lien-sound');
    var muteSound = document.getElementById('mute-sound');
    var musicControler = $('#musicControler');
    // FUNCTIONS
    function animation(selector, animate, option, time = 2000) {
        $(selector).addClass('animated ' + animate + '');
        setTimeout(function() {
            $(selector).removeClass('animated ' + animate + '');
            switch (option) {
                case 'remove':
                    $(selector).remove();
                    break;
                case 'hide':
                    $(selector).hide();
                    break;
                case 'show':
                    $(selector).show();
                    break;
            }
        }, time);
    }
    // FIN FUNCTIONS



    $( "#synopsis" ).mousemove(function( event ) { // Quand je bouge la souris
        var positionX = event.pageX - $('.synopsis-bg').offset().left - $('.synopsis-bg').width()/2; // X
        var positionY = event.pageY - $('.synopsis-bg').offset().top - $('.synopsis-bg').height()/2; // Y
        $('.synopsis-bg').css({  // image bouge
            'transform' : 'translate('+ positionX/200 +'% , '+ -positionY/200 +'%) scale(1.5)',
            '-webkit-transform' : 'translate('+ positionX/200 +'% , '+ -positionY/200 +'%) scale(1.5)',
            '-ms-transform' : 'translate('+ positionX/200 +'% , '+- positionY/200 +'%) scale(1.5)',
        });
    }); // FIN Mouse move






    //______________________________________________________________// Click sur PLAY
    $('#teaser .glyphicon-play').on('click', function(event) {
        var overlay = $('#teaser .overlay');
        var video ='<div class="video"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span><iframe id="youtube_player-teaser"src="https://www.youtube-nocookie.com/embed/O-pLKVyOHTA?rel=0&amp;controls=1&amp;showinfo=0&enablejsapi=1" frameborder="0"allowfullscreen></iframe></div> ';
        $('#teaser .overlay-black').css({'opacity': 1,});
        $('video').get(0).pause(); // pause la video du bg
        animation(this, 'zoomOut', 'hide', 500);
        $(overlay).addClass('full');
        $('.teaser-card').append(video);
        setTimeout(function(){
            $('.video').css({
                'display' : 'block',
                'opacity' : '1',
            });
            var videoSrc = $('iframe').attr('src');
            $('iframe').attr('src', videoSrc + '&autoplay=1'); //AUTO PLAY
            animation('.video', 'zoomIn');
        }, 500);
        setTimeout(function () {
            animation('.glyphicon-remove', 'zoomIn', 'show', 500);
            $('.glyphicon-remove').css('opacity', 1);
        }, 3000);
        music.pause(); // pause la musique de fodn
        musicControler.css('color', colorPrimary);
        musicControler.removeClass();
        musicControler.addClass('glyphicon glyphicon-volume-off');
    });

    //Click sur le croix de la VIDEO ou le BG BALCK
    $('body').on('click', '.glyphicon-remove, .overlay-black', function(event) {
        console.log('click');
        $('#teaser .overlay-black').css({'opacity': 0,}); // enlève le overlay-black
        $('video').get(0).play(); //play la video du bg
        animation('.glyphicon-remove', 'zoomOut', 'hide', 500); // display none le btn pour quitter la video
        animation('.video', 'zoomOut', 'hide', 500); // display none la video
        setTimeout(function () { // wait and display btn play
            $('.video').remove();
            $('#teaser .glyphicon-play').css('display', 'flex');
            animation('#teaser .glyphicon-play', 'zoomIn', 500);
            $('#teaser .overlay').removeClass('full');
        }, 500);
        music.play();
        musicControler.css('color', 'white');
        musicControler.removeClass();
        musicControler.addClass('glyphicon glyphicon-volume-up');
    });
    //______________________________________________________________-HOVER PLAY
    $( "#teaser .glyphicon-play" ).hover(
        function() { //IN
            if ( !$( "#teaser .overlay" ).is( ".full" ) )
            $('#teaser .overlay-black').css({
                'opacity': 1,
            });
        }, function() { //OUT
            if ( !$( "#teaser .overlay" ).is( ".full" ) )
            $('#teaser .overlay-black').css({
                'opacity': 0,
            });
        }
    );

    //______________________________________________________________-Quand je ne suis plus sur teaser - arrête la vidéo
    $('#teaser').mouseleave(function(event) {
        $('video').get(0).pause(); // pause la video du bg
    });
    $('#teaser').mouseenter(function(event) {
        $('video').get(0).play(); // pause la video du bg
    });

//______________________________________________________________ SOUND
//_______________________________________ Hover Lien
$('nav a, span#musicControler, #link-dossier').mouseover(function() {
    $('#lien-sound').get(0).play();
});
$('#musicControler').on('click', function() {
    $('#mute-sound').get(0).play();
});
//_______________________________________ Controleur Sound
//variable music tout en haut du js
music.volume = 1;
lienSound.volume = 0.1;
muteSound.volume = 0.1;
$('#musicControler').on('click', function() {
    if ($(this).hasClass('glyphicon-volume-off')) {
        music.play();
        lienSound.volume = 0.1;
        muteSound.volume = 0.1;
        $(this).css('color', 'white');
        $(this).removeClass('glyphicon-volume-off');
        $(this).addClass('glyphicon-volume-up');
    }else {
        music.pause();
        lienSound.volume = 0;
        muteSound.volume = 0;
        $(this).css('color', colorPrimary);
        $(this).removeClass('glyphicon-volume-up');
        $(this).addClass('glyphicon-volume-off');
    }
});

$(window).focus(function() { // sur la page carlzone
    music.volume = 1;
});
$(window).blur(function() { // sur une autre page - baisse le son
    music.volume = 0.3;
});
// function redimensionHover(selector, selector2) {
//     $( selector ).hover(
//         function() { //IN
//             $(this).css({'width': '69.999%',});
//             $(selector2).css({'width': '29.999%',});
//             $(selector2 + ' .overlay-black').css({'opacity': 1,});
//         }, function() { //OUT
//             $(this).css({'width': '49.999%',});
//             $(selector2).css({'width': '49.999%',});
//             $(selector2 + ' .overlay-black').css({'opacity': 0,});
//         }
//     );
//     redimensionHover(selector2, selector);
// }
// redimensionHover('.tournage-equipe', '.tournage-photos');

$('.tournage-equipe')

}); // FIN JQ
