class XenoLeftPanel extends HTMLElement {
    connectedCallback() {
        this.render();
        this.bind();
    }

    render() {
        this.innerHTML = `
            <div class="video-container" id="leftVideo">
                <div class="video-label">CAMERA IN</div>
                <div style="height: 100%; display: flex; align-items: center; justify-content: center; color: rgba(0, 255, 65, 0.3);">
                    NO SIGNAL
                </div>
            </div>
            <div class="file-input-container">
                <input type="file" id="leftVideoInput" class="file-input" accept="video/*">
                <label for="leftVideoInput" class="upload-label">↑ LOAD VIDEO 1</label>
            </div>
        `;
    }

    bind() {
        const input = this.querySelector('#leftVideoInput');
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('video/')) {
                const url = URL.createObjectURL(file);
                const container = this.querySelector('#leftVideo');
                const label = container.querySelector('.video-label').outerHTML;
                container.innerHTML = `
                    ${label}
                    <video src="${url}" loop muted autoplay></video>
                `;
            }
        });
    }
}

customElements.define('xeno-left-panel', XenoLeftPanel);


