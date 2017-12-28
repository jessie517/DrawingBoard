(function ($) {
    $.Board = $.Board || {};
    $.extend($.Board, {
        version: "1.0.0",
        getDefaultTemplate: function () {
            return "<div class='canvas-box'><canvas class='background' id='" + this.backgroudId + "' ></canvas>"
                +"<canvas calss='foreground' id='" + this.foregroudId + "'></canvas></div>";
        },
        render: function (parentId) {
            this.containerId = parentId;
            this.backgroudId = "main-board-" + parentId + "-backgroud";
            this.foregroudId = "main-board-" + parentId + "-foreground"
            var template = this.getDefaultTemplate();
            $("#" + parentId).html(template);

            var backCanvas = document.getElementById(this.backgroudId);
            backCanvas.width = backCanvas.offsetWidth;
            backCanvas.height = backCanvas.offsetHeight;

            var foreCanvas = document.getElementById(this.foregroudId);
            foreCanvas.width = foreCanvas.offsetWidth;
            foreCanvas.height = foreCanvas.offsetHeight;

            return {backCanvas:backCanvas, foreCanvas: foreCanvas};
        },
        renderToolBar: function(){

        }
    });
})(jQuery);