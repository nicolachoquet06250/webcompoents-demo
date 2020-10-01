import { PolymerElement, html } from '/node_modules/@polymer/polymer/polymer-element.js';
import App from '/components/polymer/app/App.js';
import RouteContainer from '/components/polymer/router/route/RouteContainer.js';

export default class RouteLink extends PolymerElement {
    static get tag() {
        return 'route-link';
    }

    static get properties() {
        return {
            href: {
                type: String,
                notify: true,
                reflectToAttribute: true,
                value: '/'
            }
        }
    }

    static get template() {
        return html`<style> @import "https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"; </style>
<a href$="{{href}}" onclick="on_click">
    <slot></slot>
</a>`;
    }

    on_click(e) {
        const router = document.querySelector(App.tag).shadowRoot.querySelector(RouteContainer.tag).router;

        e.preventDefault();

        history.pushState({}, this.href, this.href);
        router.init();
    }
}

customElements.define(RouteLink.tag, RouteLink);
