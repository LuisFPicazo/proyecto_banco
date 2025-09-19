class Movimientos extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {

      console.log('mov-',{tag: this.tagName});
        this.render()
    }

    render() {
        const fecha = this.getAttribute('fecha') || '';
        const tipo = this.getAttribute('tipo') || '';
        const monto = this.getAttribute('monto') || '';
        
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
            
            :host(:hover) { transform: scale(1.03); }

            .movimientos > div {
              font-size: 1.5rem;
              font-weight: bold;
              color: white;
              margin-bottom: 1rem;
            }
            
            .movimientos {
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            
            .movimiento-tipo {
              color: #bfac8b;
              font-weight: bold;
            }
            
          </style>
          
          <div class="movimientos">
            <section> 
              <div class="movimiento-fecha">${fecha}</div>
              <div class="movimiento-tipo">${tipo}</div>
            </section>
            <div class="movimiento-monto">${monto}</div>
          </div>
        `;
    }
}

customElements.define('movimientos-banco', Movimientos);