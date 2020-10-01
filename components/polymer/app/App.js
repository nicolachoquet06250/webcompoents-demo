export default class RouteLink extends HTMLElement {
    static get is() {
        return 'route-link';
    }

    get customStyle() {
        return `<style> @import "https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"; </style>`;
    }

    get template() {
        return `<a href="${this.href}"><slot></slot></a>`;
    }

    get href() {
        return this._href || '';
    }
    set href(href) {
        this._href = href;
    }

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this._href = this.getAttribute('href');
    }

    static get observedAttributes() {
        return ['href'];
    }

    attributeChangedCallback(name, old, value) {
        if (old) {
            this[`_${name}`] = value;
            if (`on_${name}_changed` in this) {
                this[`on_${name}_changed`](old, value);
            }
        }
    }

    on_href_changed(old, value) {
        this.shadowRoot.querySelector('a').setAttribute('href', this.href);
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `${this.customStyle}
${this.template}`;

        this.shadowRoot.querySelector('a').addEventListener('click', e => this.on_click(e));
    }

    on_click(e) {
        const router = document.querySelector('route-container').router;

        e.preventDefault();

        history.pushState({}, this.href, this.href);
        router.init();
    }

}

customElements.define(RouteLink.is, RouteLink);
