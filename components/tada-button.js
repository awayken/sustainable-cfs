// # stage-3: Importing a third-party component
import "@polymer/paper-tooltip/paper-tooltip.js";

class TadaButton extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.attachEvents();
  }

  attachEvents() {
    const button = this.root.querySelector("button");
    const tooltip = this.root.querySelector("paper-tooltip");

    button.addEventListener("click", e => {
      // # stage-3: Third-party components may have useful API methods
      tooltip.hide();
      tooltip.innerHTML = "You rock!";

      button.innerHTML = "✅ I already do this!";
      button.classList.add("tip__button--done");

      tooltip.updatePosition();
      tooltip.show();
    });
  }

  render() {
    const styles = `
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

    const tmpl = `
        ${styles}
        <p>
            <button id="idothis" class="tip__button">I Do This!</button>
            <!-- # stage-3: Include it just like our own custom elements -->
            <paper-tooltip for="idothis" animationDelay="150">Click this button if you do this already.</paper-tooltip>
        </p>
    `;

    this.root.innerHTML = tmpl;
  }
}

window.customElements.define("tada-button", TadaButton);
