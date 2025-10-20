(function (n) {
    (function (n) {
        (function t(n) {
            if (window.jQuery) {
                n.BoxLinkFooter = function () { return t(), {} }; function t() {
                    $(".js__box-link-content-title .js__box-link-title--view-more").click(function () { $(this).closest(".js__box-link-content-title").addClass("active") }); $(".js__box-link-content-title .js__box-link-title--view-less").click(function () { $(this).closest(".js__box-link-content-title").removeClass("active") }); $(".js__box-link-col-link .js__box-link-list--view-more").click(function () { $(this).closest(".js__box-link-col-link").addClass("active") }); $(".js__box-link-col-link .js__box-link-list--view-less").click(function () { $(this).closest(".js__box-link-col-link").removeClass("active") });
                    $(`.js__box-link-col-link .sub-link-title a`).click(function () { $(this).attr("data-sub") != "on" ? ($(this).closest(".lv1").addClass("active"), $(this).attr("data-sub", "on")) : ($(this).closest(".lv1").removeClass("active"), $(this).attr("data-sub", "off")) })
                }
            } else setTimeout(t(n), 100)
        })(n.Footer || (n.Footer = {}))
    })(n.BoxLink || (n.BoxLink = {}))
})(window.FrontEnd || (window.FrontEnd = {}));