const afbeeldingen = document.querySelectorAll('.foto-grid img');

const modal = document.getElementById('fotoModal');
const groteFoto = document.getElementById('groteFoto');

const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

function openFoto(index) {
    currentIndex = index;
    groteFoto.src = afbeeldingen[index].src;
    modal.style.display = 'block';
}

function showNext() {
    currentIndex++;

    if (currentIndex >= afbeeldingen.length) {
        currentIndex = 0;
    }

    groteFoto.src = afbeeldingen[currentIndex].src;
}

function showPrev() {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = afbeeldingen.length - 1;
    }

    groteFoto.src = afbeeldingen[currentIndex].src;
}

afbeeldingen.forEach((img, index) => {
    img.addEventListener('click', () => {
        openFoto(index);
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

document.addEventListener('keydown', (e) => {
    if (modal.style.display !== 'block') return;

    if (e.key === 'ArrowRight') {
        showNext();
    }

    if (e.key === 'ArrowLeft') {
        showPrev();
    }

    if (e.key === 'Escape') {
        modal.style.display = 'none';
    }
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});