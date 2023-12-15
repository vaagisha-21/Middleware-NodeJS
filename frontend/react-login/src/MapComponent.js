import React from 'react';

export const MapComponent = ({ latitude, longitude }) => {
  const openMapInNewTab = () => {
    const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=15`;
    window.open(mapUrl, '_blank');
  };

  return (
      <button className='btn btn-link text-success p-1' onClick={openMapInNewTab}>Location</button>
  );
};

