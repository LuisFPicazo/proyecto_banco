class Tarjeta extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();

    // boton que redirige
    const btnVer = this.shadowRoot.querySelector('#ver-movimientos');
    if (btnVer) {
      btnVer.addEventListener('click', () => {
        const usuarioId = this.getAttribute('usuario-id') || '';

        if (!usuarioId) {
          console.warn('tarjeta-banco: falta usuario-id');
          return;
        }

        let url = `/movimientos/${encodeURIComponent(usuarioId)}`;
  
        window.location.href = url;
      });
    }
  }

  render() {
    const tipo = this.getAttribute('tipo') || '';
    const saldo = this.getAttribute('saldo') || '';
    const numero = this.getAttribute('numero') || '';
    const boton1 = this.getAttribute('boton1') || '';
    const boton2 = this.getAttribute('boton2') || '';
    const boton3 = this.getAttribute('boton3') || '';
    //redireccion

    this.shadowRoot.innerHTML = `
          <style>
            :host {
              display: block;
              background-color: #134647;
              color: white;
              padding: 1.5rem;
              border-radius: 14px;
              box-shadow: 0 6px 14px rgba(0,0,0,0.25);
              font-family: sans-serif;
              margin-bottom: 1rem;
            }
            h2 {
              margin: 0 0 0.3rem 0;
              font-size: 1.3rem;
              font-weight: 700;
            }
            .producto-tipo {
              font-size: 0.9rem;
              opacity: 0.85;
              letter-spacing: 0.03em;
              margin-bottom: 0.3rem;
            }
            .numero-producto {
              font-family: monospace;
              font-size: 0.85rem;
              opacity: 0.7;
              margin-bottom: 0.6rem;
            }
            .saldo {
              font-size: 1.5rem;
              font-weight: 700;
              color: white;
              margin-bottom: 1rem;
            }
            .acciones {
              display: flex;
              gap: 0.6rem;
            }
            button {
              flex: 1;
              background-color: #0c7e7e;
              border: none;
              border-radius: 10px;
              padding: 0.6rem 0;
              color: white;
              font-weight: 600;
              cursor: pointer;
              transition: background-color 0.3s ease;
              letter-spacing: 0.03em;
              font-size: 0.9rem;
            }
            button:hover {
              background-color: #00272d;
            }
          </style>
          <h2>${tipo}</h2>
          <div class="producto-tipo">Saldo Disponible</div>
          <div class="saldo">${saldo}</div>
          <div class="numero-producto">${numero}</div>
          <div class="acciones">
            <button id="ver-movimientos">${boton1}</button>
            <button>${boton2}</button>
            <button>${boton3}</button>
          </div>
        `;

    //
  }
}

customElements.define('tarjeta-banco', Tarjeta);