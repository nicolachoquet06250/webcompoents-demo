class Navbar extends HTMLElement {
    static get is() {
        return 'nav-bar';
    }

    get customStyle() {
        return `<style>@import "https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css";</style>`;
    }

    get logo() {
        return this._logo || '';
    }
    set logo(logo) {
        this.setAttribute('logo', logo);
    }

    get logoLink() {
        return this._logo_link || '/';
    }
    set logoLink(logoLink) {
        this.setAttribute('logo_link', logoLink);
    }

    get items() {
        return this._items ? JSON.parse(this._items) : [];
    }
    set items(items) {
        this.setAttribute('items', (items ? JSON.stringify(items) : '[]'));
    }

    id() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    get template() {
        return `
<div class="relative bg-white" id="template">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div class="lg:w-0 lg:flex-1">
                <route-link href="${this.logoLink}" class="flex">
                    <img class="h-8 w-auto sm:h-10" id="logo" src="${this.logo}" alt="Workflow">
                </route-link>
            </div>
            <div class="-mr-2 -my-2 md:hidden">
                <button type="button"
                        class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500
                               hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out" id="menu-open">
                    <!-- Heroicon name: menu -->
                    <img src="/images/burger.svg" class="h-6 w-6" />
                </button>
            </div>
            <nav class="hidden md:flex space-x-10">
                ${(() => {
                    let all = [];
                    for (let item of this.items) {
                        const uniq_id = this.id();

                        if (item.sub_items) {
                            all.push(`
                <div class="relative">
                    <!-- Item active: "text-gray-900", Item inactive: "text-gray-500" -->
                    <button type="button"
                            class="text-gray-500 group inline-flex items-center space-x-2 text-base leading-6 font-medium
                                   hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150" 
                            data-target="#first-${uniq_id}">
                        <span>${item.item}</span>
                        <!--
                          Heroicon name: chevron-down

                          Item active: "text-gray-600", Item inactive: "text-gray-400"
                        -->
                        <img src="/images/down.svg" class="text-gray-400 h-5 w-5 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
                    </button>

                    <!--
                      'Solutions' flyout menu, show/hide based on flyout menu state.

                      Entering: "transition ease-out duration-200"
                        From: "opacity-0 translate-y-1"
                        To: "opacity-100 translate-y-0"
                      Leaving: "transition ease-in duration-150"
                        From: "opacity-100 translate-y-0"
                        To: "opacity-0 translate-y-1"
                    -->
                    <div class="absolute -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                        <div class="rounded-lg shadow-lg">
                            <div id="first-${uniq_id}" class="rounded-lg shadow-xs overflow-hidden hidden">
                                <div class="z-20 relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                    ${(() => {
                                        let all = [];
                                        for (let sous_item of item.sub_items) {
                                            if (sous_item.component === undefined) {
                                                if (sous_item.items_footer === undefined) {
                                                    all.push(`
        <a href="#" class="-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150">
            <!-- Heroicon name: chart-bar -->
            <img src="${sous_item.icon}" class="flex-shrink-0 h-6 w-6 text-indigo-600" />
            <div class="space-y-1">
                <p class="text-base leading-6 font-medium text-gray-900">${sous_item.name}</p>
                ${sous_item.description ? `<p class="text-sm leading-5 text-gray-500">${sous_item.description}</p>` : ''}
            </div>
        </a>`);
                                                }
                                            }
                                        }
                                        return all;
                                    })().join("\n")}
                                </div>
                                ${(() => {
                                    let all = [];
                                    for (let sous_item of item.sub_items) {
                                        if (sous_item.component === undefined) {
                                            if (sous_item.items_footer !== undefined) {
                                                all.push(`<div class="px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">`);
                                                for (let footer of sous_item.items_footer) {
                                                    all.push(`
    <div class="flow-root">
        <a href="#" class="-m-3 p-3 flex items-center space-x-3 rounded-md text-base leading-6
                           font-medium text-gray-900 hover:bg-gray-100 transition ease-in-out duration-150">
            <!-- Heroicon name: play -->
            <img src="${footer.icon}" class="flex-shrink-0 h-6 w-6 text-gray-400" />
            <span>${footer.name}</span>
        </a>
    </div>`);
                                                }
                                                all.push(`</div>`);
                                                break;
                                            }
                                        }
                                    }
                                    return all;
                                })().join("\n")}
                                ${(() => {
                                    let all = [];
                                    for (let sous_item of item.sub_items) {
                                        if (sous_item.component) {
                                            all.push(`<div class="px-5 py-5 bg-gray-50 space-y-5 sm:px-8 sm:py-8">`);
                                            all.push(`<${sous_item.component}></${sous_item.component}>`);
                                            all.push(`</div>`);
                                        }
                                    }
                                    return all
                                })().join("\n")}
                            </div>
                        </div>
                    </div>
                </div>`);
                        }
                        else {
                            all.push(`
<route-link href="${item.href}" class="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none
                   focus:text-gray-900 transition ease-in-out duration-150">
    ${item.item}
</route-link>`);
                        }
                    }
                    return all;
                })().join("\n")}
            </nav>
            <div class="hidden md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
                <a href="#"
                   class="whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900">
                    Sign in
                </a>
                <span class="inline-flex rounded-md shadow-sm">
                    <a href="#"
                       class="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent
                              text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                        Sign up
                    </a>
                </span>
            </div>
        </div>
    </div>

    <!--
      Mobile menu, show/hide based on mobile menu state.

      Entering: "duration-200 ease-out"
        From: "opacity-0 scale-95"
        To: "opacity-100 scale-100"
      Leaving: "duration-100 ease-in"
        From: "opacity-100 scale-100"
        To: "opacity-0 scale-95"
    -->
    <div class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden" id="mobile-menu">
        <div class="rounded-lg shadow-lg">
            <div class="rounded-lg shadow-xs bg-white divide-y-2 divide-gray-50">
                <div class="pt-5 pb-6 px-5 space-y-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
                                 alt="Workflow">
                        </div>
                        <div class="-mr-2">
                            <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 
                                                         hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 
                                                         focus:text-gray-500 transition duration-150 ease-in-out" 
                                    id="menu-close">
                                <!-- Heroicon name: x -->
                                <img src="/images/close.svg" class="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                    
                    ${(() => {
                        let all = [];
                        let cmp = 0;
                        for (let item of this.items) {
                            const uniq_id = this.id();
            
                            if (item.sub_items) {
                                all.push(`<nav class="grid gap-y-8 ${cmp > 0 ? 'hidden' : ''}" id="mobile-menu-${uniq_id}">`);
                                all.push((() => {
                                    let all = [];
                                    for (let sous_item of item.sub_items) {
                                        if (sous_item.component === undefined && sous_item.items_footer === undefined) {
                                                all.push(`
                                <a href="#" class="-m-3 p-3 flex items-center space-x-3 rounded-md hover:bg-gray-50 transition ease-in-out duration-150">
                                    <!-- Heroicon name: chart-bar -->
                                    <img src="${sous_item.icon}" class="flex-shrink-0 h-6 w-6 text-indigo-600" />
                                    <div class="text-base leading-6 font-medium text-gray-900"> ${sous_item.name} </div>
                                </a>`);
                                        }
                                    }
                                    return all;
                                })().join("\n"));
                                all.push(`</nav>`);
                                cmp++;
                            }
                        }
                        return all;
                    })().join("\n")}
                </div>
                <div class="py-6 px-5 space-y-6">
                    <div class="grid grid-cols-2 gap-y-4 gap-x-8">
                        ${(() => {
                            let all = [];
                            for (let item of this.items) {
                                const uniq_id = this.id();

                                all.push(`<${item.href ? 'route-link' : 'a'} href="${item.href ? item.href : '#/'}" 
                                                                             class="text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150"> 
                                    ${item.item} 
                                </${item.href ? 'route-link' : 'a'}>`)
                            }
                            return all;
                        })().join("\n")}
                        <!--<a href="#"
                           class="text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150">
                            Pricing
                        </a>
                        <a href="#"
                           class="text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150">
                            Docs
                        </a>
                        <a href="#"
                           class="text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150">
                            Enterprise
                        </a>
                        <a href="#"
                           class="text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150">
                            Blog
                        </a>
                        <a href="#"
                           class="text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150">
                            Help Center
                        </a>
                        <a href="#"
                           class="text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150">
                            Guides
                        </a>
                        <a href="#"
                           class="text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150">
                            Security
                        </a>
                        <a href="#"
                           class="text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150">
                            Events
                        </a>-->
                    </div>
                    <div class="space-y-6">
                        <span class="w-full flex rounded-md shadow-sm">
                          <a href="#"
                             class="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                            Sign up
                          </a>
                        </span>
                        <p class="text-center text-base leading-6 font-medium text-gray-500">
                            Existing customer?
                            <a href="#"
                               class="text-indigo-600 hover:text-indigo-500 transition ease-in-out duration-150">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;
    }

    static get observedAttributes() {
        return ['logo', 'logo_link', 'items'];
    }

    attributeChangedCallback(name, old, value) {
        if (old) {
            this[`_${name}`] = value;
            if (`on_${name}_changed` in this) {
                this[`on_${name}_changed`](old, value);
            }
        }
    }

    on_items_changed() {
        this.shadowRoot.innerHTML = `${this.customStyle}
${this.template}`;

        this.init();
    }

    on_logo_changed() {
        this.shadowRoot.querySelector('#logo').setAttribute('src', this.logo);
    }

    on_logo_link_changed() {
        this.shadowRoot.querySelector('#logo').parentElement.setAttribute('href', this.logoLink);
    }

    constructor() {
        super();

        this.attachShadow({mode: "open"});

        this._logo = this.getAttribute('logo') || '';
        this._logo_link = this.getAttribute('logo_link') || '/';
        this._items = this.getAttribute('items') ? this.getAttribute('items') : '[]';
    }

    connectedCallback() {
        this.on_items_changed();
    }

    toggleMenu(e) {
        e.preventDefault();

        const mobile_menu = this.shadowRoot.querySelector('#mobile-menu');
        mobile_menu.classList[(mobile_menu.classList.contains('hidden') ? 'remove' : 'add')]('hidden');
    }

    init() {
        Array.from(this.shadowRoot.querySelectorAll('button'))
            .map(b =>
                b.addEventListener('click', e => {
                    e.preventDefault();

                    if (b.hasAttribute('data-target') && b.getAttribute('data-target') !== '') {
                        const elem = this.shadowRoot.querySelector(b.getAttribute('data-target'));
                        if (elem.classList.contains('hidden')) {
                            elem.classList.remove('hidden')
                        } else {
                            elem.classList.add('hidden')
                        }
                    }
                })
            );

        const mobile_menu = this.shadowRoot.querySelector('#mobile-menu');
        this.shadowRoot.querySelector('#menu-close').addEventListener('click', this.toggleMenu.bind(this));
        this.shadowRoot.querySelector('#menu-open').addEventListener('click', this.toggleMenu.bind(this));
    }

}

customElements.define(Navbar.is, Navbar);
