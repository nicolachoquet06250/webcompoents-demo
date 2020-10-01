import { PolymerElement, html } from '/node_modules/@polymer/polymer/polymer-element.js';
import RouterClass from "../../../../src/routing/RouterClass.js";
import Route from '/components/polymer/router/route/Route.js';
import App from '/components/polymer/app/App.js';

export default class RouteContainer extends PolymerElement {
    static get tag() {
        return 'route-container';
    }

    get router() {
        return this._router;
    }
    set router(router) {
        this._router = router;
    }

    connectedCallback() {
        this.router = new RouterClass((this.getAttribute('app-container') || '#app'), document.querySelector(App.tag));

        let nbRoutes = this.querySelectorAll(Route.tag).length;
        let routesLoaded = 0;

        for (let route of this.querySelectorAll(Route.tag))
            route.addEventListener('loaded', () => {
                routesLoaded++;
                if (routesLoaded === nbRoutes)
                    this.router.init();
            });

        window.addEventListener("popstate",
            () => this.router.init())
    }
}

customElements.define(RouteContainer.tag, RouteContainer);
