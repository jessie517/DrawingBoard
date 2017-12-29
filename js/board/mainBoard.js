(function ($) {
    $.Board = $.Board || {};
    $.extend($.Board, {
        version: "1.0.0",
        getDefaultTemplate: function (paintCanvasId, previewCanvasId) {
            return "<div class='canvas-box'><canvas class='paintCanvas' id='" + paintCanvasId + "' ></canvas>"
                +"<canvas calss='previewCanvas' id='" + previewCanvasId + "'></canvas></div>";
        },
        render: function (parentId) {
            var containerId = parentId;
            var paintCanvasId = "main-board-" + parentId + "-paintCanvas";
            var previewCanvasId = "main-board-" + parentId + "-previewCanvas"

            var template = this.getDefaultTemplate(paintCanvasId, previewCanvasId);
            $("#" + containerId).html(template);

            var paintCanvas = document.getElementById(paintCanvasId);
            paintCanvas.width = paintCanvas.offsetWidth;
            paintCanvas.height = paintCanvas.offsetHeight;

            var previewCanvas = document.getElementById(previewCanvasId);
            previewCanvas.width = previewCanvas.offsetWidth;
            previewCanvas.height = previewCanvas.offsetHeight;

            return {containerId:containerId, paintCanvas:paintCanvas, previewCanvas: previewCanvas};
        },
        renderToolBar: function(){

        }
    });
})(jQuery);