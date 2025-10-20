(function (n) {
    (function t(i) {
        window.FrontEnd && window.FrontEnd.BdsSelectController ? n.Footer = function () {
            (function () {
                document.querySelectorAll(".js__branch-show").forEach(n => { n.addEventListener("click", function (n) { var t = navigator.userAgent.toLowerCase(), i = /(iphone|ipod|ipad|mac|android)/i.test(t); window.innerWidth <= 1024 || i || document.querySelector(`.re__body-map-search`) ? (n.target.classList.contains("re__hidden-content-icon") ? n.target.classList.remove("re__hidden-content-icon") : n.target.classList.add("re__hidden-content-icon"), n.target.parentElement.querySelectorAll(".js__branch-detail").forEach(n => { n.hasAttribute("style") ? n.removeAttribute("style") : n.style.display = "block" })) : document.querySelector(`.js__downarr`).style.display == "none" ? (document.querySelector(`.js__downarr`).style.display = "inline-block", document.querySelector(`.js__uparr`).style.display = "none", n.target.parentElement.parentElement.querySelectorAll(".js__branch-detail").forEach(n => { n.removeAttribute("style") })) : (document.querySelector(`.js__downarr`).style.display = "none", document.querySelector(`.js__uparr`).style.display = "inline-block", n.target.parentElement.parentElement.querySelectorAll(".js__branch-detail").forEach(n => { n.style.display = "none" })) }) }); document.querySelector("footer .list-international") && (document.querySelector("footer .list-international").addEventListener("mouseover", function () { document.querySelector("#country") && (document.querySelector("#country").style.display = "block") }), document.querySelector("footer .list-international").addEventListener("mouseout", function () { document.querySelector("#country") && (document.querySelector("#country").style.display = "none") })); new window.FrontEnd.BdsSelectController(document.querySelector("#hdCboLanguages")); document.querySelector(`#hdCboLanguages`).getParent(`js__bds-select-container`).querySelectorAll(`.advance-options`).forEach(n => {
                    n.addEventListener("click", function (n) {
                        if (n.preventDefault(), n.target == "A") { let t = n.target.getAttribute("href"); window.open(t) } else {
                            let t = n.target.getParent("advance-options").getAttribute("href");
                            window.open(t)
                        }
                    })
                })
            })()
        } : i && setTimeout(function () { t(i - 1) }, 500)
    })()
})(window.FrontEnd || (window.FrontEnd = {}));