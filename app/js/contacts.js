

var drawingApp = (function () {

  "use strict";

  var canvasWidth = window.innerWidth,
    canvasHeight = window.innerHeight,
    clearButton = document.getElementById('btnClear'),
    clickX = [],
    clickY = [],
    clickDrag = [],
    paint,
    canvas,
    context,

    // Resizes the canvas.
    resizeCanvas = function () {

      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;

      canvas.setAttribute('width', canvasWidth);
      canvas.setAttribute('height', canvasHeight);

      /**
                 * Your drawings need to be inside this function otherwise they will be reset when 
                 * you resize the browser window and the canvas goes will be cleared.
                 */
      redraw();
    },

    // Clears the canvas.
    clearCanvas = function () {

      context.clearRect(0, 0, canvasWidth, canvasHeight);

    },

    // Erase all actions.
    eraseAll = function () {

      clickX = [];
      clickY = [];
      clickDrag = [];
      clearCanvas();

    },

    // Redraws the canvas.
    redraw = function () {

      clearCanvas();

      var radius = 8;
      context.strokeStyle = "#3644FD";
      context.lineJoin = "round";
      context.lineWidth = radius;

      for (var i = 0; i < clickX.length; i++) {
        context.beginPath();
        if (clickDrag[i] && i) {
          context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
          context.moveTo(clickX[i] - 1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.stroke();
      }

    },

    // Adds a point to the drawing array.
    // @param x
    // @param y
    // @param dragging
    addClick = function (x, y, dragging) {

      clickX.push(x);
      clickY.push(y);
      clickDrag.push(dragging);

    },

    // Add mouse and touch event listeners to the canvas
    createUserEvents = function () {

      var press = function (e) {
        // Mouse down location
        var mouseX = e.pageX - this.offsetLeft,
          mouseY = e.pageY - this.offsetTop;

        paint = true;
        addClick(mouseX, mouseY, false);
        redraw();
      },

        drag = function (e) {
          if (paint) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
          }
          // Prevent the whole page from dragging if on mobile
          e.preventDefault();
        },

        release = function () {
          paint = false;
          redraw();
        },

        cancel = function () {
          paint = false;
        };

      // Add mouse event listeners to canvas element
      canvas.addEventListener("mousedown", press, false);
      canvas.addEventListener("mousemove", drag, false);
      canvas.addEventListener("mouseup", release);
      canvas.addEventListener("mouseout", cancel, false);

      // Add touch event listeners to canvas element
      canvas.addEventListener("touchstart", press, false);
      canvas.addEventListener("touchmove", drag, false);
      canvas.addEventListener("touchend", release, false);
      canvas.addEventListener("touchcancel", cancel, false);

    },

    /**
    * Creates a canvas element.
    */
    init = function () {

      // Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
      canvas = document.createElement('canvas');
      canvas.setAttribute('width', canvasWidth);
      canvas.setAttribute('height', canvasHeight);
      canvas.setAttribute('id', 'canvas');
      document.getElementById('canvasContainer').appendChild(canvas);
      if (typeof G_vmlCanvasManager !== "undefined") {
        canvas = G_vmlCanvasManager.initElement(canvas);
      }
      context = canvas.getContext("2d"); // Grab the 2d canvas context
      // Note: The above code is a workaround for IE 8 and lower. Otherwise we could have used:
      //     context = document.getElementById('canvas').getContext("2d");

      // Add mouse events
      // ----------------

      createUserEvents();

      clearButton.addEventListener("mousedown", eraseAll, false);
      window.addEventListener("resize", resizeCanvas);

    };

  return {
    init: init
  };

}());

drawingApp.init();


// var canvas, ctx, flag = false,
//   prevX = 0,
//   currX = 0,
//   prevY = 0,
//   currY = 0,
//   dot_flag = false;

// var x = "black",
//   y = 2;

// function init() {
//   canvas = document.getElementById('canvas');
//   ctx = canvas.getContext("2d");
//   w = canvas.width;
//   h = canvas.height;

//   canvas.addEventListener("mousemove", function (e) {
//     findxy('move', e)
//   }, false);
//   canvas.addEventListener("mousedown", function (e) {
//     findxy('down', e)
//   }, false);
//   canvas.addEventListener("mouseup", function (e) {
//     findxy('up', e)
//   }, false);
//   canvas.addEventListener("mouseout", function (e) {
//     findxy('out', e)
//   }, false);
// }

// function color(obj) {
//   switch (obj.id) {
//     case "green":
//       x = "green";
//       break;
//     case "blue":
//       x = "blue";
//       break;
//     case "red":
//       x = "red";
//       break;
//     case "yellow":
//       x = "yellow";
//       break;
//     case "orange":
//       x = "orange";
//       break;
//     case "black":
//       x = "black";
//       break;
//     case "white":
//       x = "white";
//       break;
//   }
//   if (x == "white") y = 14;
//   else y = 2;

// }

// function draw() {
//   ctx.beginPath();
//   ctx.moveTo(prevX, prevY);
//   ctx.lineTo(currX, currY);
//   ctx.strokeStyle = x;
//   ctx.lineWidth = y;
//   ctx.stroke();
//   ctx.closePath();
// }

// function erase() {
//   var m = confirm("Want to clear");
//   if (m) {
//     ctx.clearRect(0, 0, w, h);
//     document.getElementById("canvasimg").style.display = "none";
//   }
// }

// function save() {
//   document.getElementById("canvasimg").style.border = "2px solid";
//   var dataURL = canvas.toDataURL();
//   document.getElementById("canvasimg").src = dataURL;
//   document.getElementById("canvasimg").style.display = "inline";
// }

// function findxy(res, e) {
//   if (res == 'down') {
//     prevX = currX;
//     prevY = currY;
//     currX = e.clientX - canvas.offsetLeft;
//     currY = e.clientY - canvas.offsetTop;

//     flag = true;
//     dot_flag = true;
//     if (dot_flag) {
//       ctx.beginPath();
//       ctx.fillStyle = x;
//       ctx.fillRect(currX, currY, 2, 2);
//       ctx.closePath();
//       dot_flag = false;
//     }
//   }
//   if (res == 'up' || res == "out") {
//     flag = false;
//   }
//   if (res == 'move') {
//     if (flag) {
//       prevX = currX;
//       prevY = currY;
//       currX = e.clientX - canvas.offsetLeft;
//       currY = e.clientY - canvas.offsetTop;
//       draw();
//     }
//   }
// }
