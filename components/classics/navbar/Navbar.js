import { PolymerElement, html } from '/node_modules/@polymer/polymer/polymer-element.js';

import "/components/polymer/pages/test/Test.js";
import "/components/polymer/pages/test2/Test2.js";

import "/components/polymer/router/route/RouteContainer.js";
import "/components/polymer/router/route/Route.js";
import "/components/polymer/router/route-link/RouteLink.js";

export default class App extends PolymerElement {
    static get tag() {
        return 'my-app';
    }

    static get template() {
        return html`<style> @import "https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"; </style>

<route-container app-container="#app">
    <route-def path="/" component="my-test"></route-def>
    <route-def path="/test2" component="my-test-2"></route-def>
    <route-def path="/pricing" component="my-test-2"></route-def>
</route-container>

<nav class="p-3">
    <route-link href="/">Home</route-link>
    <route-link href="/test2">Mon test 2</route-link>
</nav>

<div id="app" class="p-3"></div>`;
    }
}

customElements.define(App.tag, App);

document.body.innerHTML = `<${App.tag}></${App.tag}>`;

