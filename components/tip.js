import "./tada-button";

class CFSTip extends HTMLElement {
  static get observedAttributes() {
    return ["type", "heading", "credit-name", "credit-handle"];
  }
  get type() {
    return this.getAttribute("type");
  }
  set type(val) {
    this.setAttribute("type");
  }
  get heading() {
    return this.getAttribute("heading");
  }
  set heading(val) {
    this.setAttribute("heading");
  }
  get creditName() {
    return this.getAttribute("credit-name");
  }
  set creditName(val) {
    this.setAttribute("credit-name");
  }
  get creditHandle() {
    return this.getAttribute("credit-handle");
  }
  set creditHandle(val) {
    this.setAttribute("credit-handle");
  }

  constructor() {
    super();

    this.content = this.innerHTML;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const tmpl = `
        <section id="${this.type}" class="tip tip--${this.type}">
            <div class="tip__wrap">
                <h1>
                    <a class="tip__anchor" href="#${this.type}">
                        ${this.heading}
                    </a>
                </h1>

                ${this.content}

                <tada-button></tada-button>
            </div>

            <cite class="tip__credit">
                Photo by <a
                href="https://unsplash.com/@${this.creditHandle}?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                ${this.creditName}</a> on <a
                href="https://unsplash.com/">Unsplash</a>
            </cite>
        </section>
    `;

    this.innerHTML = tmpl;
  }
}

window.customElements.define("cfs-tip", CFSTip);
