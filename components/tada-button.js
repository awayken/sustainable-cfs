// Helper variable for toggling shadow
let turnOffTheLights = false;

// # stage-2: Uncomment to make shadowy.
// turnOffTheLights = true;

class TadaButton extends HTMLElement {
  constructor() {
    super();

    this.root = this;
    if (turnOffTheLights) {
        // Attach a shadow root to this custom element
      this.root = this.attachShadow({ mode: "open" });
    }
  }

  connectedCallback() {
    this.render();
    this.attachEvents();
  }

  attachEvents() {
    const button = this.root.querySelector("button");

    button.addEventListener("click", e => {
      button.innerHTML = "✅ I already do this!";
      button.setAttribute("title", "You rock!");
      button.classList.add("tip__button--done");
    });
  }

  render() {
    let styles = ``;

    if (turnOffTheLights) {
      styles = `
                <style>
                    /**
                     Shamelessly stolen from: https://daneden.github.io/animate.css/
                    **/
                    @-webkit-keyframes tada {
                    from {
                        -webkit-transform: scale3d(1, 1, 1);
                        transform: scale3d(1, 1, 1);
                    }

                    10%,
                    20% {
                        -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
                        transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
                    }

                    30%,
                    50%,
                    70%,
                    90% {
                        -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
                        transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
                    }

                    40%,
                    60%,
                    80% {
                        -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
                        transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
                    }

                    to {
                        -webkit-transform: scale3d(1, 1, 1);
                        transform: scale3d(1, 1, 1);
                    }
                    }

                    @keyframes tada {
                    from {
                        -webkit-transform: scale3d(1, 1, 1);
                        transform: scale3d(1, 1, 1);
                    }

                    10%,
                    20% {
                        -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
                        transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
                    }

                    30%,
                    50%,
                    70%,
                    90% {
                        -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
                        transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
                    }

                    40%,
                    60%,
                    80% {
                        -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
                        transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
                    }

                    to {
                        -webkit-transform: scale3d(1, 1, 1);
                        transform: scale3d(1, 1, 1);
                    }
                    }

                    * {
                        font-family: "Hepta Slab";
                        font-weight: 400;
                    }

                    button {
                        border: 2px solid #333;
                        border-radius: .4em;
                        cursor: pointer;
                        display: block;
                        font: inherit;
                        margin: 1em auto;
                        transition: transform 150ms ease-in-out;
                    }

                    button:hover {
                        transform: scale(1.1);
                    }

                    .tip__button--done {
                        -webkit-animation-duration: 1s;
                        animation-duration: 1s;
                        -webkit-animation-fill-mode: both;
                        animation-fill-mode: both;
                        -webkit-animation-name: tada;
                        animation-name: tada;
                    }
                </style>
            `;
    }

    const tmpl = `
        ${styles}
        <p><button class="tip__button" title="Click this button if you do this already.">I Do This!</button></p>
    `;

    this.root.innerHTML = tmpl;
  }
}

window.customElements.define("tada-button", TadaButton);
