// src/scripts/slider.js
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.arrow.prev');
    const nextBtn = document.querySelector('.arrow.next');
    let currentSlide = 0;

    // 1. FUNCIÓN PARA CAMBIAR DE SLIDE
    const goToSlide = (index) => {
        // Limpiar slide anterior y QUITAR EL MODO CINE
        slides[currentSlide].classList.remove('active', 'is-playing');
        dots[currentSlide].classList.remove('active');
        
        // Magia: Al salir de un vídeo, le hacemos un load(). 
        // Esto corta la reproducción y le obliga a volver a poner la imagen de póster inicial.
        const oldVideo = slides[currentSlide].querySelector('video');
        if (oldVideo) {
            oldVideo.pause();
            oldVideo.load(); 
        }
        
        const oldPlayBtn = slides[currentSlide].querySelector('.btn-play-trailer');
        const oldControls = slides[currentSlide].querySelector('.video-controls');
        if(oldPlayBtn) oldPlayBtn.classList.remove('hidden');
        if(oldControls) oldControls.classList.add('hidden');

        // Calcular nuevo índice
        currentSlide = (index + slides.length) % slides.length;
        
        // Activar nuevo slide
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        // OJO: Al nuevo vídeo no le hacemos NADA. Dejamos que muestre el póster tranquilamente.
    };

    // 2. EVENTOS DE FLECHAS Y DOTS
    if(prevBtn) prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); });
    if(nextBtn) nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => { goToSlide(index); });
    });

    // 3. LÓGICA DE CONTROLES (VER TRÁILER, PAUSAR, MUTEAR)
    slides.forEach(slide => {
        const video = slide.querySelector('video');
        const playTrailerBtn = slide.querySelector('.btn-play-trailer');
        const videoControls = slide.querySelector('.video-controls');
        const pauseBtn = slide.querySelector('.btn-pause');
        const muteBtn = slide.querySelector('.btn-mute');

        if(playTrailerBtn && video) {
            playTrailerBtn.addEventListener('click', () => {
                video.muted = false; 
                video.play(); 
                
                playTrailerBtn.classList.add('hidden'); 
                videoControls.classList.remove('hidden'); 
                slide.classList.add('is-playing'); // Modo cine
            });
        }

        if(pauseBtn && video) {
            pauseBtn.addEventListener('click', () => {
                if(video.paused) {
                    video.play();
                    pauseBtn.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
                } else {
                    video.pause();
                    pauseBtn.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
                }
            });
        }

        if(muteBtn && video) {
            muteBtn.addEventListener('click', () => {
                video.muted = !video.muted;
                if(video.muted) {
                    muteBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>'; 
                } else {
                    muteBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>'; 
                }
            });
        }
    });
});