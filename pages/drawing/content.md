[drawing](https://github.com/lfont/drawing) is little JavaScript library for drawing shapes on a canvas.    
It has a very simple API and these features:

- Draw square, circle, line, free (pencil).
- Background color.
- Historic.
- Shape color and size.
- ...

By default, the API allows you to draw by x/y coordinates but a plugin (drawing.event) can listen to DOM events to draw.  

    // Draw a line on mousemove.
    jQuery(function ($) {
        var drawer = window.drawing.canvasDrawer($("#canvas")[0]),
            eventShapeDrawer = drawer.eventShapeDrawer();

        eventShapeDrawer.draw("line");
    });

This library is the core of [WebPaint](/webpaint).