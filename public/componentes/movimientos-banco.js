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
              background-color: #134647;
              color: white;
              padding: 1.5rem;
              border-radius: 14px;
              box-shadow: 0 6px 14px rgba(0,0,0,0.25);
              font-family: sans-serif;
              margin-bottom: 1rem;
            }
            .movimientos > div {
              font-size: 1.5rem;
              font-weight: 700;
              color: white;
              margin-bottom: 1rem;
            }
            
          </style>
          
          <div class="movimiento">
            <div class="movimiento-fecha">${fecha}</div>
            <div class="movimiento-tipo">${tipo}</div>
            <div class="movimiento-monto">${monto}</div>
          </div>
        `;
    }
}

customElements.define('movimientos-banco', Movimientos);