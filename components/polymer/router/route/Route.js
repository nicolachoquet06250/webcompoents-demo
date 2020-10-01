import { PolymerElement, html } from '/node_modules/@polymer/polymer/polymer-element.js';

export default class Route extends PolymerElement {
    static get tag() {
        return 'route-def';
    }

    connectedCallback() {
        const router = this.parentElement.router;

        let component;
        if ((component = this.getAttribute('component'))) {
            router.get(this.getAttribute('path'), (path, params) => {
                let _component = document.createElement(component);
                for (let p of Object.keys(params)) {
                    _component.setAttribute(p, params[p]);
                }
                router.el.innerHTML = '';
                router.el.appendChild(_component);
            });
        }

        this.dispatchEvent(new CustomEvent('loaded'));
    }
}

customElements.define(Route.tag, Route);
