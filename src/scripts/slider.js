document.addEventListener('DOMContentLoaded', () => {
    const slides = [...document.querySelectorAll('.hero-slide')];
    const dots = [...document.querySelectorAll('.dot')];
    const prevBtn = document.querySelector('.hero-slider > .arrow.prev');
    const nextBtn = document.querySelector('.hero-slider > .arrow.next');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let currentSlide = 0;
    let soundEnabled = false;
    let centerControlTimer;

    const icons = {
        play: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>',
        pause: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>',
        muted: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>',
        sound: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>'
    };

    const getParts = (slide) => ({
        video: slide.querySelector('video'),
        pauseBtn: slide.querySelector('.btn-pause'),
        muteBtn: slide.querySelector('.btn-mute'),
        centerBtn: slide.querySelector('.btn-center-play'),
        centerPlay: slide.querySelector('.icon-play'),
        centerPause: slide.querySelector('.icon-pause')
    });

    const updateControls = (slide) => {
        const { video, pauseBtn, muteBtn } = getParts(slide);
        if (!video || !pauseBtn || !muteBtn) return;
        pauseBtn.innerHTML = video.paused ? icons.play : icons.pause;
        pauseBtn.setAttribute('aria-label', video.paused ? 'Reproducir tráiler' : 'Pausar tráiler');
        muteBtn.innerHTML = video.muted ? icons.muted : icons.sound;
        muteBtn.setAttribute('aria-label', video.muted ? 'Activar sonido' : 'Silenciar');
    };

    const hideCenterControl = (centerBtn) => {
        centerBtn?.classList.add('is-hidden');
        centerBtn?.setAttribute('aria-hidden', 'true');
        if (centerBtn) centerBtn.tabIndex = -1;
    };

    const showCenterControl = (slide, mode, temporary = false) => {
        const { centerBtn, centerPlay, centerPause } = getParts(slide);
        if (!centerBtn) return;
        window.clearTimeout(centerControlTimer);
        centerBtn.classList.remove('is-hidden');
        centerBtn.removeAttribute('aria-hidden');
        centerBtn.tabIndex = 0;
        centerPlay?.classList.toggle('hidden', mode !== 'play');
        centerPause?.classList.toggle('hidden', mode !== 'pause');
        centerBtn.setAttribute('aria-label', mode === 'play' ? 'Reproducir tráiler' : 'Pausar tráiler');
        if (temporary) {
            centerControlTimer = window.setTimeout(() => hideCenterControl(centerBtn), 1400);
        }
    };

    const playSlide = async (slide) => {
        const { video, centerBtn } = getParts(slide);
        if (!video) return;
        video.muted = !soundEnabled;
        try {
            await video.play();
            slide.classList.add('is-playing');
            hideCenterControl(centerBtn);
        } catch {
            showCenterControl(slide, 'play');
        }
        updateControls(slide);
    };

    const pauseSlide = (slide) => {
        const { video } = getParts(slide);
        if (!video) return;
        video.pause();
        slide.classList.remove('is-playing');
        showCenterControl(slide, 'play');
        updateControls(slide);
    };

    const goToSlide = (index) => {
        const oldSlide = slides[currentSlide];
        const oldVideo = oldSlide.querySelector('video');
        oldSlide.classList.remove('active', 'is-playing');
        dots[currentSlide]?.classList.remove('active');
        oldVideo?.pause();
        if (oldVideo) oldVideo.currentTime = 0;

        currentSlide = (index + slides.length) % slides.length;
        const newSlide = slides[currentSlide];
        newSlide.classList.add('active');
        dots[currentSlide]?.classList.add('active');

        if (reduceMotion.matches) {
            pauseSlide(newSlide);
        } else {
            playSlide(newSlide);
        }
    };

    prevBtn?.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn?.addEventListener('click', () => goToSlide(currentSlide + 1));
    dots.forEach((dot, index) => dot.addEventListener('click', () => goToSlide(index)));

    slides.forEach((slide) => {
        const { video, pauseBtn, muteBtn, centerBtn } = getParts(slide);
        if (!video) return;

        pauseBtn?.addEventListener('click', () => video.paused ? playSlide(slide) : pauseSlide(slide));
        centerBtn?.addEventListener('click', (event) => {
            event.stopPropagation();
            video.paused ? playSlide(slide) : pauseSlide(slide);
        });
        muteBtn?.addEventListener('click', () => {
            soundEnabled = video.muted;
            video.muted = !soundEnabled;
            updateControls(slide);
        });
        slide.addEventListener('click', (event) => {
            if (video.paused || event.target.closest('a, button')) return;
            showCenterControl(slide, 'pause', true);
        });
        video.addEventListener('play', () => updateControls(slide));
        video.addEventListener('pause', () => updateControls(slide));
        video.addEventListener('volumechange', () => updateControls(slide));
        video.addEventListener('ended', () => {
            if (slide.classList.contains('active') && !reduceMotion.matches) {
                goToSlide(currentSlide + 1);
            }
        });
        updateControls(slide);
    });

    if (reduceMotion.matches) {
        pauseSlide(slides[currentSlide]);
    } else {
        playSlide(slides[currentSlide]);
    }
});
