class CFSHeader extends HTMLElement {
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

    // # stage-5: This is it??
    const template = document.getElementById(this.templateid).content;
    this.attachShadow({ mode: "open" }).appendChild(template.cloneNode(true));
  }
}

window.customElements.define("cfs-header", CFSHeader);
