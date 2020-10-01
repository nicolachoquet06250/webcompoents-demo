export default class Test extends HTMLElement {

    static get is() {
        return 'my-test';
    }

    get customStyle() {
        return `<style>@import "https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css";</style>`;
    }

    get template() {
        return `
<h1 class="text-4xl">${this.title}</h1>
<p>${this.text}</p>`
    }

    get title() {
        return 'Voici mon titre'
    }

    get text() {
        return `component ${Test.is}`;
    }

    connectedCallback() {
        this.innerHTML = `${this.customStyle}
${this.template}`;
    }

}

customElements.define(Test.is, Test);
