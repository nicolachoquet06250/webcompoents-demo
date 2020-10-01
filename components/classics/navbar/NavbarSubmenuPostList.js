export default class NavbarSubmenuPostList extends HTMLElement {
    static get is() {
        return 'nav-bar-submenu-post-list';
    }

    get customStyle() {
        return `<style> @import "https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"; </style>`;
    }

    get template() {
        return `
<div class="space-y-4">
    <h3 class="text-sm leading-5 tracking-wide font-medium text-gray-500 uppercase">
        Recent Posts
    </h3>
    <ul class="space-y-4">
        <li class="text-base leading-6 truncate">
            <a href="#"
               class="font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150">
                Boost your conversion rate
            </a>
        </li>
        <li class="text-base leading-6 truncate">
            <a href="#"
               class="font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150">
                How to use search engine optimization to drive traffic to your site
            </a>
        </li>
        <li class="text-base leading-6 truncate">
            <a href="#"
               class="font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150">
                Improve your customer experience
            </a>
        </li>
    </ul>
</div>
<div class="text-sm leading-5 mt-5">
    <route-link href="/posts"
       class="font-medium text-indigo-600 hover:text-indigo-500 transition ease-in-out duration-150">
        View all posts &rarr;
    </route-link>
</div>`;
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `${this.customStyle}
${this.template}`;

        this.dispatchEvent(new CustomEvent('loaded'));
    }

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
    }
}

customElements.define(NavbarSubmenuPostList.is, NavbarSubmenuPostList);
