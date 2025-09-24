class XenoCenterPanel extends HTMLElement {
    connectedCallback() {
        this.render();
        this.bind();
    }

    render() {
        this.innerHTML = `
            <div class="header">
                <div class="title">XENOSCAN</div>
                <div class="protocol">PROTOCOL V.0.1</div>
            </div>
            <div class="scan-area" id="scanArea">
                <div class="specimen-container" id="specimenContainer">
                    <div class="scan-line"></div>
                    <div class="reticle">
                        <svg viewBox="0 0 500 500">
                            <circle cx="250" cy="250" r="200" stroke="#00ff41" stroke-width="1" fill="none" opacity="0.3"></circle>
                            <circle cx="250" cy="250" r="150" stroke="#00ff41" stroke-width="1" fill="none" opacity="0.3"></circle>
                            <circle cx="250" cy="250" r="100" stroke="#00ff41" stroke-width="1" fill="none" opacity="0.3"></circle>
                            <line x1="250" y1="0" x2="250" y2="500" stroke="#00ff41" stroke-width="0.5" opacity="0.2"></line>
                            <line x1="0" y1="250" x2="500" y2="250" stroke="#00ff41" stroke-width="0.5" opacity="0.2"></line>
                        </svg>
                    </div>
                    <div style="height: 100%; display: flex; align-items: center; justify-content: center; color: rgba(0, 255, 65, 0.3);">
                        NO SPECIMEN LOADED
                    </div>
                </div>
            </div>
            <div class="file-input-container">
                <input type="file" id="specimenInput" class="file-input" accept="image/*">
                <label for="specimenInput" class="upload-label">↑ LOAD SPECIMEN IMAGE</label>
            </div>
        `;
    }

    bind() {
        const specimenInput = this.querySelector('#specimenInput');
        specimenInput.addEventListener('change', (e) => this.onSpecimenChange(e));
    }

    onSpecimenChange(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                const container = this.querySelector('#specimenContainer');
                container.innerHTML = `
                    <img src="${evt.target.result}" class="specimen-image" alt="Specimen">
                    <div class="wireframe-overlay">
                        <svg viewBox="0 0 500 500">${this.generateWireframe()}</svg>
                    </div>
                    <div class="scan-line"></div>
                    <div class="reticle">
                        <svg viewBox="0 0 500 500">
                            <circle cx="250" cy="250" r="200" stroke="#00ff41" stroke-width="1" fill="none" opacity="0.3"></circle>
                            <circle cx="250" cy="250" r="150" stroke="#00ff41" stroke-width="1" fill="none" opacity="0.3"></circle>
                            <circle cx="250" cy="250" r="100" stroke="#00ff41" stroke-width="1" fill="none" opacity="0.3"></circle>
                            <line x1="250" y1="0" x2="250" y2="500" stroke="#00ff41" stroke-width="0.5" opacity="0.2"></line>
                            <line x1="0" y1="250" x2="500" y2="250" stroke="#00ff41" stroke-width="0.5" opacity="0.2"></line>
                        </svg>
                    </div>
                `;
                setTimeout(() => this.addPartLabels(container), 500);
                this.updateSpecimenId();
            };
            reader.readAsDataURL(file);
        }
    }

    generateWireframe() {
        let paths = '';
        for (let i = 0; i < 20; i++) {
            const x1 = Math.random() * 500;
            const y1 = Math.random() * 500;
            const x2 = Math.random() * 500;
            const y2 = Math.random() * 500;
            paths += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#00ff41" stroke-width="0.5" opacity="0.3"></line>`;
        }
        for (let i = 0; i < 10; i++) {
            const x = Math.random() * 500;
            const y = Math.random() * 500;
            paths += `<circle cx="${x}" cy="${y}" r="3" fill="#ff6b00" opacity="0.6"></circle>`;
        }
        return paths;
    }

    addPartLabels(container) {
        const labels = ['CORE NODE', 'PETAL-LIMB', 'CLAW HOOK', 'NEURAL HUB', 'FLUX GATE'];
        const positions = [
            { top: '20%', left: '70%' },
            { top: '40%', left: '15%' },
            { top: '60%', left: '75%' },
            { top: '75%', left: '25%' },
            { top: '35%', left: '50%' }
        ];
        labels.forEach((text, i) => {
            const label = document.createElement('div');
            label.className = 'part-label';
            label.textContent = text;
            label.style.top = positions[i].top;
            label.style.left = positions[i].left;
            container.appendChild(label);
        });
    }

    updateSpecimenId() {
        const idEl = document.querySelector('#specimenId');
        if (!idEl) return;
        const types = ['FLORA', 'FAUNA', 'HYBRID', 'UNKNOWN'];
        const type = types[Math.floor(Math.random() * types.length)];
        const number = Math.floor(Math.random() * 99).toString().padStart(2, '0');
        idEl.textContent = `${type}-${number}`;
    }
}

customElements.define('xeno-center-panel', XenoCenterPanel);


