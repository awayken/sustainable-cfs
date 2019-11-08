// # CFSTip Class
//
// Must extend HTMLElement to get DOM API access.
// Use this to define the JavaScript API for your element.
class CFSTip extends HTMLElement {
  // # Attributes and Properties

  // ## observedAttributes
  //
  // Tells browser which attributes you want to reflect.
  // Whitelist here helps with performance.
  static get observedAttributes() {
    return ["type", "heading", "credit-name", "credit-handle"];
  }
  // Reflecting a change to this JS property to the DOM representation
  get type() {
    return this.getAttribute("type");
  }
  set type(val) {
    this.setAttribute("type", val);
  }
  get heading() {
    return this.getAttribute("heading");
  }
  set heading(val) {
    this.setAttribute("heading", val);
  }
  // Note the case change
  get creditName() {
    return this.getAttribute("credit-name");
  }
  set creditName(val) {
    this.setAttribute("credit-name", val);
  }
  get creditHandle() {
    return this.getAttribute("credit-handle");
  }
  set creditHandle(val) {
    this.setAttribute("credit-handle", val);
  }

  // # Custom Element Reactions
  // (lifecycle callbacks)

  // ## Constructor
  //
  // Element is instantiated.
  // * Set blank state
  // * Add event listeners
  // * Create ShadowDOM
  constructor() {
    console.log("CFSTip: Constructed!");

    super();

    this.content = this.innerHTML;
  }

  // ## connectedCallback
  //
  // Element is inserted into the DOM.
  // * Do major setup work here
  // * Fetch resources
  // * Render
  connectedCallback() {
    console.log("CFSTip: Connected!");

    this.render();

    // # stage-1: Uncomment this to fix "I Do This" buttons
    // this.iDoThis();
  }

  // ## disconnectedCallback
  //
  // Element is removed from the DOM.
  // * Do clean-up here
  disconnectedCallback() {
    console.log("CFSTip: Disconnected!");
  }

  // ## attributeChangedCallback
  //
  // Element's observed attribute has changed.
  // * Some attribute was added, removed, updated, or replaced
  // * Must be listed in observedAttributes
  // * Process and render
  attributeChangedCallback(attrName, oldVal, newVal) {
    console.log("CFSTip: Changed!");
    console.log(attrName, oldVal, newVal);

    if (oldVal !== newVal) {
      this.render();
    }
  }

  // # Custom Methods

  // Custom method: I Do This!
  iDoThis() {
    const dothises = this.querySelectorAll(".js-idothis");

    [...dothises].forEach(idothis => {
      console.log(idothis);

      idothis.addEventListener("click", e => {
        idothis.innerHTML = "✅ I already do this!";
        idothis.setAttribute("title", "You rock!");
        idothis.classList.add("tip__button--done");
      });
    });
  }

  // Custom method: render our component
  render() {
    console.log("CFSTip: Rendered!");

    // This is a custom function to make handling rendering easier
    const tmpl = `
        <section id="${this.type}" class="tip tip--${this.type}">
            <div class="tip__wrap">
                <h1>
                    <a class="tip__anchor" href="#${this.type}">
                        ${this.heading}
                    </a>
                </h1>

                ${this.content}

                <p><button class="js-idothis tip__button" title="Click this button if you do this already.">I Do This!</button></p>
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

// # Define Custom Element
//
// Rules for element names:
// * Must contain a dash
// * Can only define each element once
// * Cannot be self-closing
window.customElements.define("cfs-tip", CFSTip);
