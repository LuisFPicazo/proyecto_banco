class TarjetaOferta extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
      }

      static get observedAttributes() {
        return ['titulo', 'descripcion', 'boton'];
      }

      connectedCallback() {
        this.render();
      }

      attributeChangedCallback() {
        this.render();
      }

      render() {
        const titulo = this.getAttribute('titulo') || 'OFERTA ESPECIAL';
        const descripcion = this.getAttribute('descripcion') || '';
        const boton = this.getAttribute('boton') || '';

        this.shadowRoot.innerHTML = `
          <style>
            :host {
              display: block;
              background: linear-gradient(135deg, #0c7e7e 0%, #134647 100%);
              color: white;
              padding: 1.5rem 1.5rem 1.5rem 1.2rem;
              border-left: 5px solid #bfac8b;
              border-radius: 10px;
              box-shadow: 0 4px 10px rgba(0,0,0,0.15);
              font-family: sans-serif;
              margin-bottom: 1.5rem;
              transition: transform 0.2s ease;
            }

            :host(:hover) {
              transform: scale(1.01);
            }

            h2 {
              margin: 0 0 0.5rem 0;
              font-size: 1rem;
              font-weight: 800;
              text-transform: uppercase;
              color: #bfac8b;
              letter-spacing: 0.03em;
            }

            .descripcion {
              font-size: 0.95rem;
              line-height: 1.5;
              color: #ffffff;
              opacity: 0.95;
              font-weight: 300;
            }

            .acciones {
              display: flex;
              justify-content: flex-end;
              margin-top: 1rem;
            }

            button {
              background-color: transparent;
              border: 1px solid #bfac8b;
              border-radius: 8px;
              padding: 0.4rem 1rem;
              color: #bfac8b;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.3s ease;
              font-size: 0.85rem;
              text-transform: uppercase;
              letter-spacing: 0.02em;
            }

            button:hover {
              background-color: #bfac8b;
              color: #0c7e7e;
            }
          </style>

          <h2>${titulo}</h2>
          <div class="descripcion">${descripcion}</div>
          ${
            boton
              ? `<div class="acciones">
                  <button>${boton}</button>
                </div>`
              : ''
          }
        `;
      }
    }

    customElements.define('offer-card', TarjetaOferta);