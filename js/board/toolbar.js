(function ($) {
    $.Board = $.Board || {};
    $.extend($.Board, {
        renderToolBar: function (canvas, config) {
            config = config || {};
            $.extend(config, {
                paint: true,
                drawLine: true,
                rect: true,
                text: true,
                eraser: true
            }, config)

            var html = "<div class='main-board-toolbar' id='" + canvas.containerId + "-tool'>";
            if (config.paint) {
                html += "<button id='" + canvas.containerId + "-paint'>画笔</button>"
            }
            if (config.paint) {
                html += "<button id='" + canvas.containerId + "-drawLine'>直线</button>"
            }
            if (config.rect) {
                html += "<button id='" + canvas.containerId + "-rect'>矩形框</button>"
            }
            if (config.text) {
                html += "<button id='" + canvas.containerId + "-text'>文字</button>"
            }
            if (config.eraser) {
                html += "<button id='" + canvas.containerId + "-eraser'>橡皮擦</button>"
            }
            html += "</div>";
            $("#" + canvas.containerId).append(html);
            this.bindEvent(canvas, config);
        },
        bindEvent: function (canvas, config) {
            if (config.paint) {
                $("#" + canvas.containerId + "-paint").on("click", function () {
                    paint.init(canvas);
                });
            }
            if (config.drawLine) {
                $("#" + canvas.containerId + "-drawLine").on("click", function () {
                    drawLine.init(canvas);
                });
            }
            if (config.rect) {
                $("#" + canvas.containerId + "-rect").on("click", function () {
                    rect.init(canvas);
                });
            }
            if (config.text) {
                $("#" + canvas.containerId + "-text").on("click", function () {
                    text.init(canvas);
                });
            }
            if (config.eraser) {
                $("#" + canvas.containerId + "-eraser").on("click", function () {
                    eraser.init(canvas);
                });
            }
        }
    })

    function clearPreview(previewCanvas) {
        var previewCxt = previewCanvas.getContext("2d");
        previewCxt.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
        $(previewCanvas).removeClass("painting");
        $(previewCanvas).removeClass("drawLine");
        $(previewCanvas).removeClass("recting");
        $(previewCanvas).removeClass("texting");
        $(previewCanvas).removeClass("erasing");
    }

    var paint = {
        init: function (canvas) {
            clearPreview(canvas.previewCanvas);
            $(canvas.previewCanvas).addClass("painting");
            this.drawEvent(canvas);
        },
        drawEvent: function (canvas) {
            var paintCtx = canvas.paintCanvas.getContext("2d");
            var offsetTop = $(canvas.paintCanvas).parent()[0].offsetTop - 16;
            var offsetLeft = $(canvas.paintCanvas).parent()[0].offsetLeft;

            function startDraw(event) {
                paintCtx.beginPath();
                paintCtx.moveTo(event.pageX - offsetLeft, event.pageY - offsetTop);
            }

            function drawPreview(event) {
                paintCtx.lineTo(event.pageX - offsetLeft, event.pageY - offsetTop)
                paintCtx.stroke();
            }

            function endDraw(event) {
                paintCtx.lineTo(event.pageX - offsetLeft, event.pageY - offsetTop)
                paintCtx.stroke();
                $(canvas.previewCanvas).unbind("mousemove");
                $(canvas.previewCanvas).unbind("mouseup");
            }

            $(canvas.previewCanvas).unbind();
            $(canvas.previewCanvas).on("mousedown", function (event) {
                startDraw(event);
                $(canvas.previewCanvas).on("mousemove", function (event) {
                    drawPreview(event);
                }).on("mouseup", function (event) {
                    endDraw(event);
                })
            });

        }
    }

    var drawLine = {
        init: function (canvas) {
            clearPreview(canvas.previewCanvas);
            $(canvas.previewCanvas).addClass("drawLine");
            this.drawEvent(canvas);
        },
        drawEvent: function (canvas) {
            var previewCtx = canvas.previewCanvas.getContext("2d");
            previewCtx.globalCompositeOperation = "copy";
            var paintCtx = canvas.paintCanvas.getContext("2d");

            var offsetTop = $(canvas.paintCanvas).parent()[0].offsetTop;
            var offsetLeft = $(canvas.paintCanvas).parent()[0].offsetLeft;

            var startX, startY;

            function startDraw(event) {
                startX = event.pageX - offsetLeft;
                startY = event.pageY - offsetTop;
            }

            function drawPreview(event) {
                previewCtx.beginPath();
                previewCtx.moveTo(startX, startY);
                previewCtx.lineTo(event.pageX - offsetLeft, event.pageY - offsetTop);
                previewCtx.stroke();
            }

            function endDraw(event) {
                paintCtx.beginPath();
                paintCtx.moveTo(startX, startY);
                paintCtx.lineTo(event.pageX - offsetLeft, event.pageY - offsetTop)
                paintCtx.stroke();
                $(canvas.previewCanvas).unbind("mousemove");
                $(canvas.previewCanvas).unbind("mouseup");
            }

            $(canvas.previewCanvas).unbind();
            $(canvas.previewCanvas).on("mousedown", function (event) {
                startDraw(event);
                $(canvas.previewCanvas).on("mousemove", function (event) {
                    drawPreview(event);
                }).on("mouseup", function (event) {
                    endDraw(event);
                })
            });
        }
    }

    var rect = {
        init: function (canvas) {
            clearPreview(canvas.previewCanvas);
            $(canvas.previewCanvas).addClass("recting");
            this.drawEvent(canvas);
        },
        drawEvent: function (canvas) {
            var previewCtx = canvas.previewCanvas.getContext("2d");
            previewCtx.globalCompositeOperation = "copy";
            var paintCtx = canvas.paintCanvas.getContext("2d");

            var offsetTop = $(canvas.paintCanvas).parent()[0].offsetTop;
            var offsetLeft = $(canvas.paintCanvas).parent()[0].offsetLeft;

            var startX, startY;

            function startDraw(event) {
                startX = event.pageX - offsetLeft;
                startY = event.pageY - offsetTop;
            }

            function drawPreview(event) {
                var width = event.pageX - offsetLeft - startX;
                var height = event.pageY - offsetTop - startY;
                previewCtx.beginPath();
                previewCtx.rect(startX, startY, width, height);
                previewCtx.stroke();
            }

            function endDraw(event) {
                var width = event.pageX - offsetLeft - startX;
                var height = event.pageY - offsetTop - startY;
                paintCtx.beginPath();
                paintCtx.rect(startX, startY, width, height);
                paintCtx.stroke();

                $(canvas.previewCanvas).unbind("mousemove");
                $(canvas.previewCanvas).unbind("mouseup");
            }

            $(canvas.previewCanvas).unbind();
            $(canvas.previewCanvas).on("mousedown", function (event) {
                startDraw(event);
                $(canvas.previewCanvas).on("mousemove", function (event) {
                    drawPreview(event);
                }).on("mouseup", function (event) {
                    endDraw(event);
                })
            });
        }
    }

    var text = {
        init: function (canvas) {
            clearPreview(canvas.previewCanvas);
            $(canvas.previewCanvas).addClass("texting");
            this.drawEvent(canvas);
        },
        drawEvent: function (canvas) {
            var paintCtx = canvas.paintCanvas.getContext("2d");
            paintCtx.font = "12px 宋体";
            var offsetTop = $(canvas.paintCanvas).parent()[0].offsetTop;
            var offsetLeft = $(canvas.paintCanvas).parent()[0].offsetLeft;

            var startX, startY;

            $(canvas.previewCanvas).unbind();
            $(canvas.previewCanvas).on("click", function (event) {
                var startX = event.pageX - offsetLeft;
                var startY = event.pageY - offsetTop;
                $(canvas.paintCanvas).parent().append("<textarea class='main-board-textarea' cols='20' rows='1'></textarea>");

                var textElement = $(canvas.paintCanvas).siblings(".main-board-textarea");
                textElement.css({left: startX, top: startY - 14});
                textElement.focus();
                textElement.on("blur", function () {
                    var text = $(this).val();
                    paintCtx.fillText(text, startX, startY);
                    $(this).remove();
                });
            });
        }
    }

    var eraser = {
        init: function (canvas) {
            clearPreview(canvas.previewCanvas);
            $(canvas.previewCanvas).addClass("erasing");
            this.drawEvent(canvas);
        },
        drawEvent: function (canvas) {
            var paintCtx = canvas.paintCanvas.getContext("2d");
            var offsetTop = $(canvas.paintCanvas).parent()[0].offsetTop - 12;
            var offsetLeft = $(canvas.paintCanvas).parent()[0].offsetLeft;

            function startDraw(event) {
                paintCtx.globalCompositeOperation = "destination-out";
                paintCtx.lineWidth = 4;
                paintCtx.beginPath();
                paintCtx.moveTo(event.pageX - offsetLeft, event.pageY - offsetTop);
            }

            function drawPreview(event) {
                paintCtx.lineTo(event.pageX - offsetLeft, event.pageY - offsetTop)
                paintCtx.stroke();
            }

            function endDraw(event) {
                paintCtx.lineTo(event.pageX - offsetLeft, event.pageY - offsetTop)
                paintCtx.stroke();

                // 恢复会话层的状态
                paintCtx.globalCompositeOperation = "source-over";
                paintCtx.lineWidth = 1;
                $(canvas.previewCanvas).unbind("mousemove");
                $(canvas.previewCanvas).unbind("mouseup");
            }

            $(canvas.previewCanvas).unbind();
            $(canvas.previewCanvas).on("mousedown", function (event) {
                startDraw(event);
                $(canvas.previewCanvas).on("mousemove", function (event) {
                    drawPreview(event);
                }).on("mouseup", function (event) {
                    endDraw(event);
                })
            });
        }
    }
})(jQuery)