class ScrollTopper extends HTMLElement {
  // # stage-4: Observe our own attribute
  static get observedAttributes() {
    return ["templateid"];
  }
  get templateid() {
    return this.getAttribute("templateid");
  }
  set templateid(val) {
    this.setAttribute("templateid", val);
  }

  constructor() {
    super();

    this.whereToScroll = [0, 0];
    this.isGoBack = true;

    // Saving callback as a property so we can remove it later
    this.windowScroll = e => {
      const currX = window.scrollX;
      const currY = window.scrollY;
      const x = this.whereToScroll[0];
      const y = this.whereToScroll[1];

      if ((currX > 0 || currY > 0) && (x > 0 || y > 0)) {
        this.isGoBack = true;
        this.setTopper(0, 0);
      }
    };

    // # stage-4: Get template, cloneNode and append to make it live
    const template = document.getElementById(this.templateid);
    this.appendChild(template.content.cloneNode(true));

    // Since we swap out some of it, cache the template for reuse
    this.template = this.innerHTML;
  }

  connectedCallback() {
    this.addEventListener("click", e => {
      if (e) {
        e.preventDefault();
      }

      this.togglePosition();
    });

    window.addEventListener("scroll", this.windowScroll);

    this.render();
  }

  disconnectedCallback() {
    window.removeEventListener("scroll", this.windowScroll);
  }

  setTopper(x, y) {
    this.whereToScroll = [x, y];

    // # stage-4: Rerender every time we set the topper
    this.render();
  }

  togglePosition() {
    const currX = window.scrollX;
    const currY = window.scrollY;
    const x = this.whereToScroll[0];
    const y = this.whereToScroll[1];

    if (currX > 0 || currY > 0) {
      this.isGoBack = false;
      this.setTopper(currX, currY);
      window.scrollTo(0, 0);
    } else {
      this.isGoBack = true;
      this.setTopper(0, 0);
      window.scrollTo({
        top: y,
        left: x,
        behavior: "smooth"
      });
    }
  }

  render() {
    // # stage-4: Rendering now just replaces the message, wherever that is in the template
    if (this.isGoBack) {
      this.innerHTML = this.template.replace("{{message}}", "Back to Top");
    } else {
      this.innerHTML = this.template.replace("{{message}}", "Go Back Down");
    }
  }
}

window.customElements.define("scroll-topper", ScrollTopper);
