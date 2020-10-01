export default class RouterClass {
    get routes() {
        if (!this._routes) {
            this._routes = [];
        }
        return this._routes;
    }

    set route(route) {
        if (!this._routes) {
            this._routes = [];
        }
        this._routes.push(route);
    }

    get el() {
        return this._el;
    }
    set el(containerId) {
        if (this.app.shadowRoot) {
            this._el = this.app.shadowRoot.querySelector(containerId)
        } else {
            this._el = this.app.querySelector(containerId)
        }
    }

    get app() {
        return this._app;
    }
    set app(app) {
        this._app = app;
    }

    constructor(containerId, app) {
        this.app = app;
        this.el = containerId;
    }

    get (uri, callback, params = {}) {
        if (!uri || !callback) throw new Error('uri and callback must be given');

        if (typeof uri !== "string") throw new TypeError('typeof uri must be a string');
        if (typeof callback !== "function") throw new TypeError('typeof callback must be a function');

        for(let route of this.routes) {
            if (route.uri === uri) throw new Error(`the uri ${uri} already exists`);
        }

        this.route = { uri, callback, params };
    }

    init() {
        this.routes.some(r => {
            let regEx = new RegExp(`^(?<path>${r.uri.replace(/\//g, '\\\/')})$`, 'm');

            let path = window.location.href;
            path = path.replace(`${window.location.protocol}//${window.location.host}`, '');
            let m = regEx.exec(path);

            if (m) {
                r.callback(path, r.params);
            }
        });
    }
}
