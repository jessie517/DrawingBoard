(function ($) {
    $.Board = $.Board || {};
    $.extend($.Board, {
        renderToolBar: function (canvas, config) {
            this.config = this.config || {};
            $.extend(this.config, {
                paint: true,
                drawLine: true,
                rect: true,
                text: true
            }, config)

            var html = "<div class='main-board-toolbar' id='" + this.id + "-tool'>";
            if (this.config.paint) {
                html += "<button id='" + this.id + "-paint'>画笔</button>"
            }
            if (this.config.paint) {
                html += "<button id='" + this.id + "-drawLine'>直线</button>"
            }
            if (this.config.rect) {
                html += "<button id='" + this.id + "-rect'>矩形框</button>"
            }
            if (this.config.text) {
                html += "<button id='" + this.id + "-text'>文字</button>"
            }
            html += "</div>";
            $("#" + this.containerId).append(html);
            this.bindEvent(canvas);
        },
        bindEvent: function (canvas) {
            if (this.config.paint) {
                $("#" + this.id + "-paint").on("click", function () {
                    paint.init(canvas);
                });
            }
            if (this.config.drawLine) {
                $("#" + this.id + "-drawLine").on("click", function () {
                    drawLine.init(canvas);
                });
            }
            if (this.config.rect) {
                $("#" + this.id + "-rect").on("click", function () {
                    rect.init(canvas);
                });
            }
            if (this.config.text) {
                $("#" + this.id + "-text").on("click", function () {
                    text.init(canvas);
                });
            }
        }
    })

    function clearClasses(foreCanvas) {
        $(foreCanvas).removeClass("painting");
        $(foreCanvas).removeClass("drawLine");
        $(foreCanvas).removeClass("recting");
        $(foreCanvas).removeClass("texting");
    }

    var paint = {
        init: function (canvas) {
            clearClasses(canvas.foreCanvas);
            $(canvas.foreCanvas).addClass("painting");
            this.drawEvent(canvas);
        },
        drawEvent: function (canvas) {
            var backCtx = canvas.backCanvas.getContext("2d");
            var offsetTop = $(canvas.backCanvas).parent()[0].offsetTop - 16;
            var offsetLeft = $(canvas.backCanvas).parent()[0].offsetLeft;

            function startDraw(event) {
                backCtx.beginPath();
                backCtx.moveTo(event.pageX - offsetLeft, event.pageY - offsetTop);
            }

            function drawPreview(event) {
                backCtx.lineTo(event.pageX - offsetLeft, event.pageY - offsetTop)
                backCtx.stroke();
            }

            function endDraw(event) {
                backCtx.lineTo(event.pageX - offsetLeft, event.pageY - offsetTop)
                backCtx.stroke();
                $(canvas.foreCanvas).unbind("mousemove");
                $(canvas.foreCanvas).unbind("mouseup");
            }

            $(canvas.foreCanvas).unbind();
            $(canvas.foreCanvas).on("mousedown", function (event) {
                startDraw(event);
                $(canvas.foreCanvas).on("mousemove", function (event) {
                    drawPreview(event);
                }).on("mouseup", function (event) {
                    endDraw(event);
                })
            });

        }
    }

    var drawLine = {
        init: function (canvas) {
            clearClasses(canvas.foreCanvas);
            $(canvas.foreCanvas).addClass("drawLine");
            this.drawEvent(canvas);
        },
        drawEvent: function (canvas) {
            var foreCtx = canvas.foreCanvas.getContext("2d");
            foreCtx.globalCompositeOperation = "copy";
            var backCtx = canvas.backCanvas.getContext("2d");

            var offsetTop = $(canvas.backCanvas).parent()[0].offsetTop;
            var offsetLeft = $(canvas.backCanvas).parent()[0].offsetLeft;

            var startX, startY;

            function startDraw(event) {
                startX = event.pageX - offsetLeft;
                startY = event.pageY - offsetTop;
            }

            function drawPreview(event) {
                foreCtx.beginPath();
                foreCtx.moveTo(startX, startY);
                foreCtx.lineTo(event.pageX - offsetLeft, event.pageY - offsetTop);
                foreCtx.stroke();
            }

            function endDraw(event) {
                backCtx.beginPath();
                backCtx.moveTo(startX, startY);
                backCtx.lineTo(event.pageX - offsetLeft, event.pageY - offsetTop)
                backCtx.stroke();
                $(canvas.foreCanvas).unbind("mousemove");
                $(canvas.foreCanvas).unbind("mouseup");
            }

            $(canvas.foreCanvas).unbind();
            $(canvas.foreCanvas).on("mousedown", function (event) {
                startDraw(event);
                $(canvas.foreCanvas).on("mousemove", function (event) {
                    drawPreview(event);
                }).on("mouseup", function (event) {
                    endDraw(event);
                })
            });
        }
    }

    var rect = {
        init: function (canvas) {
            clearClasses(canvas.foreCanvas);
            $(canvas.foreCanvas).addClass("recting");
            this.drawEvent(canvas);
        },
        drawEvent: function (canvas) {
            var foreCtx = canvas.foreCanvas.getContext("2d");
            foreCtx.globalCompositeOperation = "copy";
            var backCtx = canvas.backCanvas.getContext("2d");

            var offsetTop = $(canvas.backCanvas).parent()[0].offsetTop;
            var offsetLeft = $(canvas.backCanvas).parent()[0].offsetLeft;

            var startX, startY;

            function startDraw(event) {
                startX = event.pageX - offsetLeft;
                startY = event.pageY - offsetTop;
            }

            function drawPreview(event) {
                var width = event.pageX - offsetLeft - startX;
                var height = event.pageY - offsetTop - startY;
                foreCtx.beginPath();
                foreCtx.rect(startX, startY, width, height);
                foreCtx.stroke();
            }

            function endDraw(event) {
                var width = event.pageX - offsetLeft - startX;
                var height = event.pageY - offsetTop - startY;
                backCtx.beginPath();
                backCtx.rect(startX, startY, width, height);
                backCtx.stroke();

                $(canvas.foreCanvas).unbind("mousemove");
                $(canvas.foreCanvas).unbind("mouseup");
            }

            $(canvas.foreCanvas).unbind();
            $(canvas.foreCanvas).on("mousedown", function (event) {
                startDraw(event);
                $(canvas.foreCanvas).on("mousemove", function (event) {
                    drawPreview(event);
                }).on("mouseup", function (event) {
                    endDraw(event);
                })
            });
        }
    }

    var text = {
        init: function (canvas) {
            clearClasses(canvas.foreCanvas);
            $(canvas.foreCanvas).addClass("texting");
            this.drawEvent(canvas);
        },
        drawEvent: function (canvas) {
            var backCtx = canvas.backCanvas.getContext("2d");
            backCtx.font = "12px 宋体";
            var offsetTop = $(canvas.backCanvas).parent()[0].offsetTop;
            var offsetLeft = $(canvas.backCanvas).parent()[0].offsetLeft;

            var startX, startY;

            $(canvas.foreCanvas).unbind();
            $(canvas.foreCanvas).on("click", function (event) {
                $(canvas.backCanvas).siblings(".main-board-textarea").remove();
                var startX = event.pageX - offsetLeft;
                var startY = event.pageY - offsetTop;
                $(canvas.backCanvas).parent().append("<textarea class='main-board-textarea' cols='20' rows='3'></textarea>");

                var textElement = $(canvas.backCanvas).siblings(".main-board-textarea");
                textElement.css({left: startX, top: startY - 14});
                textElement.focus();
                textElement.on("blur", function () {
                    var text = $(this).val();
                    backCtx.fillText(text, startX, startY);
                });
            });
        }
    }
})(jQuery)