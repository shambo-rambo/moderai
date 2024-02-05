// src/components/EssayDetailComponent.jsx
import React from 'react';

const EssayDetailComponent = ({ essay }) => {
  if (!essay) {
    return <p>Essay details not found.</p>;
  }

  return (
    <div>
      <h3>Essay Text</h3>
      <p>{essay.text}</p>
    </div>
  );
};

export default EssayDetailComponent;
