import { PolymerElement, html } from '/node_modules/@polymer/polymer/polymer-element.js';

export default class Test2 extends PolymerElement {
    static get tag() {
        return 'my-test-2';
    }

    static get properties() {
        return {
            title: {
                type: String,
                value: 'Voici mon titre'
            },
            text: {
                type: String,
                value: `component ${this.tag}`
            }
        }
    }

    static get template() {
        return html`
<style>@import "https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css";</style>

<h1 class="text-4xl font-bold">[[title]]</h1>
<p>[[text]]</p>`
    }
}

customElements.define(Test2.tag, Test2);
