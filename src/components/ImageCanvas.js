import React, { useEffect, useRef } from 'react';
import img from '../images/a.jpg';

const ImageCanvas = ({ imgURL }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    let currentZoomLevel = 1;
    let isDragging = false;
    let dragStartPosition = { x: 0, y: 0 };
    let currentTransformedCursor;

    const ZOOMINLEVEL = 1.2;
    const ZOOMOUTLEVEL = 0.8;
    const MINZOOMLEVEL = 0.5;
    const MAXZOOMLEVEL = 15;
    const DEFAULTCURSOR = 'move';
    const MOUSEDOWNCURSOR = 'grab';
    const ZOOMINCURSOR = 'zoom-in';
    const ZOOMOUTCURSOR = 'zoom-out';
    const IMAGESMOOTHINGENABLED = false;

    const image = new Image();
    image.src = imgURL || img;

    image.onload = function () {
      // Set canvas dimensions based on the loaded image
      canvas.width = image.width;
      canvas.height = image.height;

      // Display size
      const DISPLAY_WIDTH = 400; // or any desired display size
      const DISPLAY_HEIGHT = 400; // or any desired display size
      canvas.style.width = `${DISPLAY_WIDTH}px`;
      canvas.style.height = `${DISPLAY_HEIGHT}px`;

      init();
      addEventListeners();
    };

    function init() {
      const aspectRatio = image.width / image.height;
      const scale = Math.min(canvas.width / image.width, canvas.height / image.height);

      const scaledWidth = image.width * scale[0];
      const scaledHeight = scaledWidth / scale[1];

      const startX = (canvas.width - scaledWidth) / 2;
      const startY = (canvas.height - scaledHeight) / 2;

      context.drawImage(image, startX, startY, scaledWidth, scaledHeight);

      context.save();
    }

    function reset() {
      context.restore();
      drawImageToCanvas();
      context.save();
      currentZoomLevel = 1;
      canvas.style.cursor = DEFAULTCURSOR;
    }

    function drawImageToCanvas() {
      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.restore();
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    }

    function addEventListeners() {
      canvas.addEventListener('mousedown', onMouseDown);
      canvas.addEventListener('mousemove', onMouseMove);
      canvas.addEventListener('mouseup', onMouseUp);
      canvas.addEventListener('wheel', onWheel);
      canvas.addEventListener('mouseout', onMouseOut);
      document.getElementById('reset').addEventListener('click', function () {
        reset();
      });
    }

    function onMouseOut() {
      isDragging = false;
    }

    function onMouseDown(event) {
      isDragging = true;
      canvas.style.cursor = MOUSEDOWNCURSOR;
      dragStartPosition = getTransformedPoint(event.offsetX, event.offsetY);
    }

    function getTransformedPoint(x, y) {
      const originalPoint = new DOMPoint(x, y);
      return context.getTransform().invertSelf().transformPoint(originalPoint);
    }

    function onMouseMove(event) {
      canvas.style.cursor = DEFAULTCURSOR;
      currentTransformedCursor = getTransformedPoint(event.offsetX, event.offsetY);
      event.preventDefault();

      if (isDragging) {
        pan(
          currentTransformedCursor.x - dragStartPosition.x,
          currentTransformedCursor.y - dragStartPosition.y
        );
      }
    }

    function onMouseUp() {
      isDragging = false;
      canvas.style.cursor = DEFAULTCURSOR;
    }

    function onWheel(event) {
      zoom(event.deltaY < 0 ? ZOOMINLEVEL : ZOOMOUTLEVEL);
      event.preventDefault();
    }

    function zoom(zoomLevel) {
      if (currentZoomLevel === MINZOOMLEVEL && zoomLevel <= 1) {
        return;
      }

      if (currentZoomLevel === MAXZOOMLEVEL && zoomLevel >= 1) {
        return;
      }

      currentZoomLevel = Math.min(
        Math.max(currentZoomLevel * zoomLevel, MINZOOMLEVEL),
        MAXZOOMLEVEL
      );

      canvas.style.cursor = zoomLevel > 1 ? ZOOMINCURSOR : ZOOMOUTCURSOR;
      context.translate(currentTransformedCursor.x, currentTransformedCursor.y);
      context.scale(currentZoomLevel, currentZoomLevel);
      context.translate(-currentTransformedCursor.x, -currentTransformedCursor.y);
      drawImageToCanvas();
    }

    function pan(x, y) {
      context.translate(x, y);
      drawImageToCanvas();
    }

}, [imgURL]);

const pStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  color: 'white',
  backgroundColor: 'black',
  borderTopRadius: 'inherit',
  ':hover': {
    backgroundColor: 'red',
  },
};

const containerStyle = {
  position: 'relative',
  height: 400,
  width: 400,
  border: '1px solid black',
};
  return (
    <div id="canvas-container" style={{ ...containerStyle, overflow: 'hidden' }}>
      {/* ... other components */}
      <p style={pStyle}>#text</p>
            <button id="reset" style={{ position: 'absolute', top: 0, right: 0 }}>
                ⟲
            </button>
      <canvas
        id="canvas"
        ref={canvasRef}
        style={{ border: '1px dotted red', display: 'block', margin: 'auto' }}
      ></canvas>
    </div>
  );
};

export default ImageCanvas;
