{
    var component = {

        name: 'menu',

        config: {

            "html": {
                "nav": {
                    "tag": "ul",
                    "id": "nav",
                    "class": "nav %type%"
                },
                "nav_item": {
                    "tag": "li",
                    "class": "nav-item",
                    //"inner": "%caption%"
                    "inner": {
                        "tag": "a",
                        "class": "nav-link %active% %disabled%",
                        "inner": "%caption%",
                        "href": "%link%",
                        "onclick": click => {

                            const childNodes = click.path[2].childNodes;

                            for (let i=0; i < childNodes.length; i++) {
                                const element = childNodes[i].childNodes[0];

                                element.classList.remove("active");
                            }

                            click.path[0].classList.add("active");
                        }
                    }
                }
            },

            // Loading
            "jquery": [
                "ccm.load", {
                    "url": "https://code.jquery.com/jquery-3.3.1.slim.min.js",
                    "integrity": "sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo",
                    "crossorigin": "anonymous"
                }
            ],

            "propper": [
                "ccm.load", {
                    "url": "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
                    "integrity": "sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49",
                    "crossorigin": "anonymous"
                }
            ],


            "bootstrap": [
                "ccm.load", {
                    "url": "https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js",
                    "integrity": "sha384-o+RDsa0aLu++PJvFqy8fFScvbHFLtbvScb8AjopnFD+iEQ7wo/CG0xlczd+2O/em",
                    "crossorigin": "anonymous"
                }, {
                    "url": "https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css",
                    "integrity": "sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B",
                    "crossorigin": "anonymous"
                }
            ]


        },

        ccm: 'https://ccmjs.github.io/ccm/ccm.js',

        Instance: function () {

            /**
             * own reference for inner functions
             * @type {Instance}
             */
            const self = this;

            /**
             * shortcut to help functions
             * @type {Object.<string,function>}
             */
            let $;

            this.start = callback => {

                // set shortcut to help functions
                $ = self.ccm.helper;

                const data = ccm.load({
                    url: "resources/menu.json",
                    type: "json"
                }, result => {

                    const nav = $.html(self.html.nav, {
                        //type: "nav justify-content-center"
                        type: "nav-tabs"
                    });

                    console.log(window.navigator);

                    for (let value in result) {

                        nav.appendChild($.html(self.html.nav_item, {
                            caption: result[value].titel,
                            link: result[value].link,
                            disabled: "",
                            active: ""
                        }));

                    }

                    console.log(nav);

                    $.setContent(self.element, nav);
                });

                callback && callback();
            };

        }

    };

    function p() {
        window.ccm[v].component(component)
    }

    const f = "ccm." + component.name + (component.version ? "-" + component.version.join(".") : "") + ".js";
    if (window.ccm && null === window.ccm.files[f]) window.ccm.files[f] = component; else {
        const n = window.ccm && window.ccm.components[component.name];
        n && n.ccm && (component.ccm = n.ccm), "string" == typeof component.ccm && (component.ccm = {url: component.ccm});
        var v = component.ccm.url.split("/").pop().split("-");
        if (v.length > 1 ? (v = v[1].split("."), v.pop(), "min" === v[v.length - 1] && v.pop(), v = v.join(".")) : v = "latest", window.ccm && window.ccm[v]) p(); else {
            const e = document.createElement("script");
            document.head.appendChild(e), component.ccm.integrity && e.setAttribute("integrity", component.ccm.integrity), component.ccm.crossorigin && e.setAttribute("crossorigin", component.ccm.crossorigin), e.onload = function () {
                p(), document.head.removeChild(e)
            }, e.src = component.ccm.url
        }
    }
}