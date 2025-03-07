document.addEventListener('DOMContentLoaded', () => {
    const strings = ['E', 'A', 'D', 'G', 'B', 'e'];
    let currentAudio = null;

    // Preload audio samples for each string
    const audioSamples = {
        'E': new Audio('sounds/44728__casualdave__101elow.wav'), // Low E (E2)
        'A': new Audio('sounds/44729__casualdave__201a.wav'),    // A (A2)
        'D': new Audio('sounds/44730__casualdave__301d.wav'),    // D (D3)
        'G': new Audio('sounds/44731__casualdave__401g.wav'),    // G (G3)
        'B': new Audio('sounds/44732__casualdave__501b.wav'),    // B (B3)
        'e': new Audio('sounds/44733__casualdave__601e.wav')     // High E (E4)
    };

    // Set looping for all audio samples
    Object.values(audioSamples).forEach(audio => {
        audio.loop = true;
    });

    // Background images from Fretboard Fire Drill
    const backgroundImages = [
        'guitar1.JPG', 'guitar2.jpg', 'guitar3.jpg', 'guitar4.jpg', 'guitar5.jpg',
        'guitar6.jpg', 'guitar7.jpg', 'guitar8.jpg', 'guitar9.jpg', 'guitar10.jpg',
        'guitar11.jpg', 'guitar12.jpg', 'guitar13.jpg', 'guitar14.jpg', 'guitar15.jpg',
        'guitar16.jpg', 'guitar17.jpg', 'guitar18.jpg', 'guitar21.jpg', 'guitar23.jpg',
        'guitar24.jpg'
    ];

    function setRandomBackground() {
        const randomIndex = Math.floor(Math.random() * backgroundImages.length);
        document.body.style.backgroundImage = `url('${backgroundImages[randomIndex]}')`;
    }

    setRandomBackground(); // Set initial background
    window.addEventListener('load', setRandomBackground); // Refresh background on reload

    // Add click event listeners to each string label
    strings.forEach(string => {
        const element = document.getElementById(`string-${string}`);
        element.addEventListener('click', () => {
            // Stop the currently playing audio, if any
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                document.querySelectorAll('.string').forEach(el => el.classList.remove('active'));
            }

            // Play the new audio
            currentAudio = audioSamples[string];
            currentAudio.play().catch(error => {
                console.error(`Error playing sound for ${string}:`, error);
            });

            // Highlight the clicked string
            element.classList.add('active');
        });
    });

    // Stop button functionality
    const stopButton = document.getElementById('stopButton');
    stopButton.addEventListener('click', () => {
        // Stop all sounds
        strings.forEach(string => {
            audioSamples[string].pause();
            audioSamples[string].currentTime = 0;
        });
        if (currentAudio) {
            document.querySelectorAll('.string').forEach(el => el.classList.remove('active'));
        }
        currentAudio = null;
    });
});