class Formulario extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.enviarFormulario = async (event) => {
            event.preventDefault();

            const email = this.shadowRoot.querySelector('#email').value;
            const password = this.shadowRoot.querySelector('#password').value;

            try {
                const res = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const result = await res.json();

                if (res.ok) {
                    this.mostrarMensaje(`¡Bienvenido, ${result.nombre}!`, 'green');
                    localStorage.setItem('usuario', JSON.stringify(result));
                    
                    window.location.href = `/dashboard?id=${result.id}`;
                    
                } else {
                    this.mostrarMensaje(result.mensaje || 'Credenciales inválidas', 'red');
                }
            } catch (err) {
                this.mostrarMensaje('Error de conexión con el servidor', 'orange');
            }
        };

    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelector('form').addEventListener('submit', this.enviarFormulario);
    }

    mostrarMensaje(mensaje, color) {
        const divMensaje = this.shadowRoot.querySelector('#mensaje');
        divMensaje.textContent = mensaje;
        divMensaje.style.color = color;
    }
    render() {
        this.shadowRoot.innerHTML = `
      <style>
          form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-width: 320px;
            width: 100%;
            padding: 2rem;
            border-radius: 10px;
            background: #134647;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
            color: white; 
          }

          form h1 {
            margin: 0;
            font-size: 1.8rem;
            text-align: center;
            color: white; 
          }

          label {
            display: flex;
            flex-direction: column;
            font-size: 0.9rem;
          }

          input {
            padding: 0.6rem;
            font-size: 1rem;
            border: 1px solid #0c7e7e;
            border-radius: 6px;
            background-color: #00272d;
            color: #fff;
            transition: border 0.3s, background 0.3s;
          }

          input:focus {
            border-color: white;
            background-color: #00383d;
            outline: none;
          }

          button {
            padding: 0.7rem;
            font-size: 1rem;
            background-color: #0c7e7e;
            color: #fff;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          button:hover {
            background-color: #00272d;
          }

          #mensaje {
            margin-top: 0.5rem;
            font-weight: bold;
            text-align: center;
            color: #ffb347;
          }
      </style>

      <form>
          <h1>Login</h1>
          <label>
            Email:
            <input type="email" id="email" required />
          </label>
          <label>
            Contraseña:
            <input type="password" id="password" required />
          </label>
          <button type="submit">Iniciar sesión</button>
          <div id="mensaje"></div>
      </form>

    `;
    }
}

customElements.define('formulario-login', Formulario);
