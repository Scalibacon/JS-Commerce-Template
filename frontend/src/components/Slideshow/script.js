let slide_index = 1;
let slide_loop;

export function iniciaSlides(){
    mostraSlides(1);
    iniciaLoop();
}

export function iniciaLoop(){
    slide_loop = setInterval(() => {
        passaSlide(1);
    }, 5000);
}

export function pausaLoop(){
    clearInterval(slide_loop);
}

export function passaSlide(qtde) {
    mostraSlides(slide_index += qtde);
}

export function selecionaSlide(novo_index) {
    pausaLoop();
    mostraSlides(slide_index = novo_index);
}

function mostraSlides(num_slide) {
    const slides = document.getElementsByClassName("slide");
    const pontos = document.getElementsByClassName("slideshow-dot");

    if (num_slide > slides.length) {
        slide_index = 1
    }
    if (num_slide < 1) {
        slide_index = slides.length
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < pontos.length; i++) {
        pontos[i].className = pontos[i].className.replace(" ativo", "");
    }

    slides[slide_index-1].style.display = "block";
    pontos[slide_index-1].className += " ativo";
}