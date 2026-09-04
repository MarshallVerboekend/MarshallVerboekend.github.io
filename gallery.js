// ========================================
// FOTO ALBUMS
// ========================================

async function laadFotos(albumId, folder) {

    const albums = document.getElementById(albumId);

    if (!albums) {
        console.error(`Album met id "${albumId}" bestaat niet.`);
        return;
    }

    // GitHub API URL
    const apiUrl =
        `https://api.github.com/repos/marshallverboekend/marshallverboekend.github.io/contents/${folder}`;

    try {

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(
                `Kan de fotomap "${folder}" niet laden.`
            );
        }

        const bestanden = await response.json();

        // Alleen afbeeldingen behouden
        const afbeeldingen = bestanden.filter(bestand =>
            bestand.type === "file" &&
            /\.(jpg|jpeg|png|webp)$/i.test(bestand.name)
        );

        // Sorteren op nummer in de bestandsnaam
        afbeeldingen.sort((a, b) => {

            const nummerA = parseInt(
                a.name.match(/\d+/)?.[0] || 0
            );

            const nummerB = parseInt(
                b.name.match(/\d+/)?.[0] || 0
            );

            return nummerA - nummerB;
        });

        // Alle foto's toevoegen
        afbeeldingen.forEach(bestand => {

            const fotoGrid = document.createElement('div');
            fotoGrid.className = 'foto-grid';

            const img = document.createElement('img');

            img.src =
                `https://marshallverboekend.github.io/${folder}/${bestand.name}`;

            img.alt = bestand.name;

            fotoGrid.appendChild(img);
            albums.appendChild(fotoGrid);
        });

        // Modal voor dit specifieke album instellen
        startModal(albums);

    } catch (error) {

        console.error(error);

        albums.innerHTML =
            "<p>De foto's konden niet worden geladen.</p>";
    }
}


// ========================================
// MODAL
// ========================================

function startModal(album) {

    const afbeeldingen =
        album.querySelectorAll('.foto-grid img');

    const modal =
        document.getElementById('fotoModal');

    const groteFoto =
        document.getElementById('groteFoto');

    const closeBtn =
        document.querySelector('.close');

    const prevBtn =
        document.querySelector('.prev');

    const nextBtn =
        document.querySelector('.next');

    let currentIndex = 0;


    // Geen foto's? Dan stoppen
    if (afbeeldingen.length === 0) {
        return;
    }


    // Foto openen
    function openFoto(index) {

        currentIndex = index;

        groteFoto.src =
            afbeeldingen[currentIndex].src;

        modal.style.display = 'block';
    }


    // Volgende foto
    function showNext() {

        currentIndex++;

        if (currentIndex >= afbeeldingen.length) {
            currentIndex = 0;
        }

        groteFoto.src =
            afbeeldingen[currentIndex].src;
    }


    function showPrev() {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = afbeeldingen.length - 1;
        }

        groteFoto.src =
            afbeeldingen[currentIndex].src;
    }


    afbeeldingen.forEach((img, index) => {

        img.addEventListener('click', () => {

            openFoto(index);

        });

    });


    closeBtn.onclick = () => {

        modal.style.display = 'none';

    };


    nextBtn.onclick = showNext;

    prevBtn.onclick = showPrev;


    document.addEventListener('keydown', (e) => {

        if (modal.style.display !== 'block') {
            return;
        }

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

}

// amicitia tegen pelikaan
laadFotos(
    "Pelikaan_Amicitia",
    "Pelikaan_S_Amicitia_11-04-2026"
);


// Kampioenschap amicitia
laadFotos(
    "Kampioenschap_Ami",
    "Kampioenschap_Amicitia_25-26_23-05-2026"
);

// Beekse bergen
laadFotos(
    "Beekse_Bergen",
    "Beekse_Bergen_17-07-2026"
);

// Pantropica
laadFotos(
    "Pantropica",
    "Pantropica_31-05-2026"
);

// Random dump
laadFotos(
    "Random_Dump",
    "Random_Photo_Dump"
);

// Street art curacao
laadFotos(
    "Street_Art_Cura",
    "Street_Art_Curacao"
);

// Wild life curacao


// Hoenderdaell
