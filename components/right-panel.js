class XenoRightPanel extends HTMLElement {
    connectedCallback() {
        this.render();
        this.initRarity();
        this.initElemental();
        this.initPulse();
        this.bindVideo();
    }

    render() {
        this.innerHTML = `
            <div class="video-container" id="rightVideo">
                <div class="video-label">RT ANALYSIS</div>
                <div style="height: 100%; display: flex; align-items: center; justify-content: center; color: rgba(0, 255, 65, 0.3);">
                    NO SIGNAL
                </div>
            </div>
            <div class="file-input-container">
                <input type="file" id="rightVideoInput" class="file-input" accept="video/*">
                <label for="rightVideoInput" class="upload-label">↑ LOAD VIDEO 2</label>
            </div>
            <div class="info-panel">
                <div class="specimen-info">
                    <div class="specimen-id" id="specimenId">FLORA-09</div>
                    <div class="acquisition-info">
                        <div>ACQUISITION DATE: SEP 24 2025</div>
                        <div>LOCATION: SKAGIT VALLEY, WA</div>
                    </div>
                </div>
                <div class="rarity-container">
                    <div class="rarity-label">
                        <span>RARITY INDEX</span>
                        <span class="rarity-value" id="rarityValue">7.3</span>
                    </div>
                    <div class="rarity-bar" id="rarityBar"></div>
                </div>
                <div class="elemental-container">
                    <div class="elemental-label">ELEMENTAL INDEX</div>
                    <div class="elemental-bars" id="elementalBars"></div>
                </div>
                <div class="indicators-grid">
                    <div class="indicator">
                        <div class="indicator-title">PULSE</div>
                        <svg class="pulse-graph" viewBox="0 0 100 40">
                            <polyline class="pulse-line" id="pulseLine" points="0,20 10,20 15,10 20,30 25,20 35,20 40,15 45,25 50,20 60,20 65,5 70,35 75,20 85,20 90,18 95,22 100,20"></polyline>
                        </svg>
                    </div>
                    <div class="indicator">
                        <div class="indicator-title">SYSTEM</div>
                        <div class="code-scroll">
                            <div class="code-content">
                                0x7A3F INIT<br>
                                SCAN_MODE: ACTIVE<br>
                                BUFFER: 2048KB<br>
                                FREQ: 2.4GHz<br>
                                SIGNAL: OPTIMAL<br>
                                NANO-BANANA: v0<br>
                                QUANTUM_FLUX: 0.73<br>
                                ENTROPY: STABLE<br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    bindVideo() {
        const input = this.querySelector('#rightVideoInput');
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('video/')) {
                const url = URL.createObjectURL(file);
                const container = this.querySelector('#rightVideo');
                const label = container.querySelector('.video-label').outerHTML;
                container.innerHTML = `${label}<video src="${url}" loop muted autoplay></video>`;
            }
        });
    }

    initRarity() {
        const rarityBar = this.querySelector('#rarityBar');
        for (let i = 0; i < 10; i++) {
            const segment = document.createElement('div');
            segment.className = 'rarity-segment';
            rarityBar.appendChild(segment);
        }
        const updateRarity = () => {
            const value = Math.random() * 3 + 6;
            this.querySelector('#rarityValue').textContent = value.toFixed(1);
            const segments = rarityBar.querySelectorAll('.rarity-segment');
            const activeCount = Math.floor(value);
            segments.forEach((seg, i) => seg.classList.toggle('active', i < activeCount));
        };
        updateRarity();
        this._rarityTimer = setInterval(updateRarity, 3000);
    }

    initElemental() {
        const elements = ['◆', '▲', '●', '■', '★', '✦'];
        const bars = this.querySelector('#elementalBars');
        elements.forEach(icon => {
            const bar = document.createElement('div');
            bar.className = 'elemental-bar';
            const value = document.createElement('div');
            value.className = 'bar-value';
            value.textContent = Math.floor(Math.random() * 100);
            const fill = document.createElement('div');
            fill.className = 'bar-fill';
            fill.style.height = Math.random() * 60 + 20 + 'px';
            const iconEl = document.createElement('div');
            iconEl.className = 'bar-icon';
            iconEl.textContent = icon;
            bar.appendChild(value);
            bar.appendChild(fill);
            bar.appendChild(iconEl);
            bars.appendChild(bar);
        });
        this._elementalTimer = setInterval(() => {
            this.querySelectorAll('.elemental-bar').forEach(bar => {
                const fill = bar.querySelector('.bar-fill');
                const value = bar.querySelector('.bar-value');
                const newHeight = Math.random() * 60 + 20;
                fill.style.height = newHeight + 'px';
                value.textContent = Math.floor(newHeight * 1.2);
            });
        }, 2000);
    }

    initPulse() {
        this._pulseTimer = setInterval(() => {
            const pulseLine = this.querySelector('#pulseLine');
            if (!pulseLine) return;
            let points = '';
            for (let i = 0; i <= 100; i += 5) {
                const y = Math.random() * 30 + 5;
                points += `${i},${y} `;
            }
            pulseLine.setAttribute('points', points);
        }, 1000);
    }

    disconnectedCallback() {
        clearInterval(this._rarityTimer);
        clearInterval(this._elementalTimer);
        clearInterval(this._pulseTimer);
    }
}

customElements.define('xeno-right-panel', XenoRightPanel);


