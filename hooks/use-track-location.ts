import React from "react";

export const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = React.useState("");
  const [latLong, setLatLong] = React.useState("");
  const [isFindingLocation, setIsFindingLocation] = React.useState(false);

  const successHandler = (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLatLong(`${latitude},${longitude}`);
    // reset loading state
    setIsFindingLocation(false);
    // reset any error message
    setLocationErrorMsg("");
  };

  const errorHandler = () => {
    setLocationErrorMsg("Unable to retrieve your location");
    // reset loading state
    setIsFindingLocation(false);
  };

  const handleTrackLocation = () => {
    setIsFindingLocation(true);

    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by your browser");
      setIsFindingLocation(false);
    } else {
      navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
    }
  };

  return { latLong, handleTrackLocation, locationErrorMsg, isFindingLocation };
};
