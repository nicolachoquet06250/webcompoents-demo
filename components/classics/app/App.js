import "/components/classics/navbar/Navbar.js";
import "/components/classics/navbar/NavbarSubmenuPostList.js";

import "/components/classics/pages/test/Test.js";
import "/components/classics/pages/test2/Test2.js";

import "/components/classics/router/route/RouteContainer.js";
import "/components/classics/router/route/Route.js";
import "/components/classics/router/route-link/RouteLink.js";

class App extends HTMLElement {
    static get is() {
        return 'my-app';
    }

    get customStyle() {
        return `<link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"/>`;
    }

    get template() {
        return `<nav-bar logo="https://tailwindui.com/img/logos/workflow-mark-on-white.svg" logo_link="/"
         items='[
            {"item": "Solution", "sub_items": [
                { "name": "Analytics", "icon": "/images/analysis.svg", "description": "Get a better understanding of where your traffic is coming from." },
                { "name": "Engagement", "icon": "/images/engagement.svg", "description": "Speak directly to your customers in a more meaningful way." },
                { "name": "Security", "icon": "/images/security.svg", "description": "Your customers data will be safe and secure." },
                { "name": "Integrations", "icon": "/images/integration.svg", "description": "Connect with third-party tools that you’re already using." },
                { "name": "Automations", "icon": "/images/automations.svg", "description": "Build strategic funnels that will drive your customers to convert." },
                { "items_footer": [
                    { "name": "Watch Demo", "icon": "/images/watch.svg" },
                    { "name": "Contact Sales", "icon": "/images/phone.svg" }
                ] }
            ]},
            {"item": "Pricing", "href": "/pricing"},
            {"item": "Docs", "href": "/docs"},
            {"item": "More", "sub_items": [
                { "name": "Help Center", "icon": "/images/help.svg", "description": "Get all of your questions answered in our forums or contact support." },
                { "name": "Guides", "icon": "/images/guide.svg", "description": "Learn how to maximize our platform to get the most out of it." },
                { "name": "Events", "icon": "/images/events.svg", "description": "See what meet-ups and other events we might be planning near you." },
                { "name": "Security", "icon": "/images/security.svg", "description": "Understand how we take your privacy seriously." },
                { "component": "nav-bar-submenu-post-list" }
            ]}
         ]'></nav-bar>

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

    connectedCallback() {
        this.innerHTML = `${this.customStyle} ${this.template}`;
    }
}

customElements.define(App.is, App);

document.body.innerHTML = `<${App.is}></${App.is}>`;
