// App module: registers components and initializes global UI (e.g., sound toggle)
import './left-panel.js';
import './center-panel.js';
import './right-panel.js';

// Global sound toggle
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let soundEnabled = false;

function playBeep() {
    if (!soundEnabled) return;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = 800;
    gainNode.gain.value = 0.05;
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.05);
}

const soundToggle = document.createElement('div');
soundToggle.textContent = '🔇';
soundToggle.style.cssText = `
    position: fixed;
    top: 16px;
    right: 16px;
    cursor: pointer;
    font-size: 24px;
    z-index: 1001;
`;
if (document.body) {
    document.body.appendChild(soundToggle);
} else {
    document.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(soundToggle);
    });
}

soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
    if (soundEnabled) {
        audioContext.resume();
        playBeep();
    }
});

setInterval(() => {
    if (Math.random() > 0.7) playBeep();
}, 3000);


