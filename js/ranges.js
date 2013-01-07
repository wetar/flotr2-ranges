/** Ranges
	This is copied and adopted from flotr2 lines chart type **/
Flotr.addType('ranges', {
  options: {
    show: false,           // => setting to true will show ranges, false will hide
    lineWidth: 2,          // => line width in pixels for the border 
    fillBorder: false,     // => draw a border around the fill
    fillColor: null,       // => fill color
    fillOpacity: 0.4,      // => opacity of the fill color, set to 1 for a solid fill, 0 hides the fill
  },

  /**
   * Draws range series in the canvas element.
   * @param {Object} options
   */
  draw : function (options) {

    var
      context     = options.context,
      lineWidth   = options.lineWidth,
      shadowSize  = options.shadowSize,
      offset;

    context.save();
    context.lineJoin = 'round';

    if (shadowSize) {
      context.lineWidth = shadowSize / 2;
      offset = lineWidth / 2 + context.lineWidth / 2;
      
      // @TODO do this instead with a linear gradient
      context.strokeStyle = "rgba(0,0,0,0.1)";
      this.plot(options, offset + shadowSize / 2, false);

      context.strokeStyle = "rgba(0,0,0,0.2)";
      this.plot(options, offset, false);
    }

    context.lineWidth = lineWidth;
    context.strokeStyle = options.color;

    this.plot(options, 0, true);

    context.restore();
  },

  plot : function (options, shadowOffset, incStack) {

    var
      context   = options.context,
      width     = options.width, 
      height    = options.height,
      xScale    = options.xScale,
      yScale    = options.yScale,
      data      = options.data, 
      length    = data.length - 1,
      prevx     = null,
      prevy     = null,
      zero      = yScale(0),
      start     = null,
      x1, x2, y1, y2, stack1, stack2, i;
      
    if (length < 1) return;

	context.beginPath();

    for (i = 0; i < length; ++i) {
      x1 = xScale(data[i][0]);
      x2 = xScale(data[i+1][0]);

      if (start === null) start = data[i];
      
	  y1 = yScale(data[i][1]);
	  y2 = yScale(data[i+1][1]);

      if (
        (y1 > height && y2 > height) ||
        (y1 < 0 && y2 < 0) ||
        (x1 < 0 && x2 < 0) ||
        (x1 > width && x2 > width)
      ) continue;

      if((prevx != x1) || (prevy != y1 + shadowOffset))
        context.moveTo(x1, y1 + shadowOffset);
      
      prevx = x2;
      prevy = y2 + shadowOffset;
      context.lineTo(prevx, prevy);
    }
	
	context.lineTo(xScale(data[length][0]), yScale(data[length][2])+ shadowOffset);
	
	for (i = length; i > 0; --i) {
      
      x1 = xScale(data[i][0]);
      x2 = xScale(data[i-1][0]);
	  y1 = yScale(data[i][2]);
	  y2 = yScale(data[i-1][2]);

      if (
        (y1 > height && y2 > height) ||
        (y1 < 0 && y2 < 0) ||
        (x1 < 0 && x2 < 0) ||
        (x1 > width && x2 > width)
      ) continue;

      if((prevx != x1) || (prevy != y1 + shadowOffset))
        context.moveTo(x1, y1 + shadowOffset);
      
      prevx = x2;
      prevy = y2 + shadowOffset;
      context.lineTo(prevx, prevy);
    }
    
    context.lineTo(xScale(start[0]), yScale(start[1])+ shadowOffset);
	
	context.fillStyle = options.fillStyle;
	context.fill();
	if (options.fillBorder) {
		context.stroke();
	}

    context.closePath();
  },


  extendYRange : function (axis, data, options, lines) {

    var o = axis.options;

    var
      newmax = axis.max,
      newmin = axis.min,
      x, j;

	  for (j = 0; j < data.length; j++) {
		newmax = Math.max(newmax, data[j][2]);
		newmin = Math.min(newmin, data[j][2]);
	  }
      axis.max = newmax;
      axis.min = newmin;
  }

});