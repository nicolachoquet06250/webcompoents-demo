export default class Route extends HTMLElement {
    static get is() {
        return 'route-def';
    }

    connectedCallback() {
        const router = this.parentElement.router;

        let component;
        if ((component = this.getAttribute('component'))) {
            router.get(this.getAttribute('path'), (path, params) => {
                router.el.innerHTML = `<${component} ${(p => {
                    let params = [];
                    for (let param in p) {
                        params.push(`${param} = "${p[param]}"`);
                    }
                    return params.join(' ');
                })(params)}></${component}>`;
            });
        }

        this.dispatchEvent(new CustomEvent('loaded'));
    }
}

customElements.define(Route.is, Route);
