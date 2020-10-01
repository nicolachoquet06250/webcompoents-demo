import RouterClass from "../../../../src/routing/RouterClass.js";

export default class RouteContainer extends HTMLElement {
    static get is() {
        return 'route-container';
    }

    get router() {
        return this._router;
    }
    set router(router) {
        this._router = router;
    }

    constructor() {
        super();

        this.router = new RouterClass((this.getAttribute('app-container') || '#app'), document.querySelector('my-app'));
    }

    connectedCallback() {
        let nbRoutes = this.querySelectorAll('route-def').length;
        let routesLoaded = 0;

        for (let route of this.querySelectorAll('route-def'))
            route.addEventListener('loaded', () => {
                routesLoaded++;
                if (routesLoaded === nbRoutes) this.router.init();
            });

        window.addEventListener("popstate", () => this.router.init())
    }
}

customElements.define(RouteContainer.is, RouteContainer);
