class TarjetaOferta extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['titulo', 'descripcion', 'boton', 'detalles'];
  }

  connectedCallback() {
    // render + attach handlers
    this.render();
    this._attachModalHandlers();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // cuando cambian atributos, re-render y re-attach handlers
    this.render();
    this._attachModalHandlers();
  }

  _attachModalHandlers() {
    // referencias creadas por render()
    const btnModal = this.shadowRoot.querySelector('#detalles');
    const btnModalCerrar = this.shadowRoot.querySelector('#cerrarModal');
    const modal = this.shadowRoot.querySelector('dialog');
    const resultado = this.shadowRoot.querySelector('#resultado');

    // asignar listeners (si existen elementos)
    if (btnModal) {
      btnModal.addEventListener('click', () => {
        const detalles = this.getAttribute('detalles') || 'Sin detalles disponibles.';
        if (resultado) resultado.textContent = detalles;

        if (modal && typeof modal.showModal === 'function') {
          modal.showModal();
        } else {
          // fallback simple para navegadores sin <dialog>
          alert(detalles);
        }
      });
    }
    if (btnModalCerrar){
      btnModalCerrar.addEventListener('click', ()=>{
        if (modal && typeof modal.close === 'function') modal.close();
      });

    } 
    if (modal){
      modal.addEventListener('click', ()=>{
        if (e.target === modal && typeof modal.close === 'function') modal.close();
      });
    } 
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
        :host(:hover) { transform: scale(1.01); }
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

        /* estilos para dialog */
        dialog {
          border: none;
          border-radius: 10px;
          padding: 1rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        }
        dialog::backdrop {
          background: rgba(0,0,0,0.45);
        }
        #resultado {
          color: #00272d;
          font-size: 0.95rem;
          margin-bottom: 1rem;
        }
        .acciones-modal {
          display: flex;
          justify-content: flex-end;
        }
        #cerrarModal {
          background: #0c7e7e;
          color: white;
          border: none;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          cursor: pointer;
        }

      </style>

      <h2>${titulo}</h2>
      <div class="descripcion">${descripcion}</div>
      ${boton
        ? `<div class="acciones">
               <button id="detalles" type="button">${boton}</button>
             </div>`
        : ''
      }

      <dialog>
        <p id="resultado"></p>
        <div class="acciones-modal">
          <button id="cerrarModal" type="button">Cerrar</button>
        </div>
      </dialog>
    `;
  }
}

customElements.define('offer-card', TarjetaOferta);
