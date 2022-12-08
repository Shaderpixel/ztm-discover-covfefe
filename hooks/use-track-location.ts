import React from "react";
import { ACTION_TYPES, StoreContext } from "../store/store-context";

export const useTrackLocation = () => {
	const [locationErrorMsg, setLocationErrorMsg] = React.useState("");
	const [isFindingLocation, setIsFindingLocation] = React.useState(false);
	const { state: contextState, dispatch: contextDispatch } =
		React.useContext(StoreContext);

	const successHandler = (position: GeolocationPosition) => {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;
		contextDispatch({
			type: ACTION_TYPES.SET_LAT_LONG,
			payload: { latLong: `${latitude},${longitude}` },
		});
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

	return { handleTrackLocation, locationErrorMsg, isFindingLocation };
};
