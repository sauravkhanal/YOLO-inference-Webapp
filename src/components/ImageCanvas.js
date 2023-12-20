import React, { useState } from 'react';
import img from '../images/a.jpg';

var ImageContainer = ({ imgURL }) => {
  var [position, setPosition] = useState({ x: 0, y: 0 });

  var handleMouseDown = (event) => {
    var startX = event.clientX;
    var startY = event.clientY;

    var handleMouseMove = (moveEvent) => {
      var deltaX = moveEvent.clientX - startX;
      var deltaY = moveEvent.clientY - startY;

      setPosition((prevPosition) => ({
        x: prevPosition.x + deltaX,
        y: prevPosition.y + deltaY,
      }));

      startX = moveEvent.clientX;
      startY = moveEvent.clientY;
    };

    var handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '400px', // Set your desired width
        height: '400px', // Set your desired height
        overflow: 'hidden',
        border: '1px solid black',
      }}
    >
      <img
        src={imgURL || img}
        alt="Image"
        style={{
          position: 'absolute',
          top: `${position.y}px`,
          left: `${position.x}px`,
        }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default ImageContainer;
