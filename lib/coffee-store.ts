import { createApi } from "unsplash-js";

// Get Unsplash photos
const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSP_SECRET_TOKEN,
});

const getCoffeeStorePhotos = async () => {
  const unsplashResponse = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 40,
    color: "green",
    orientation: "portrait",
  });

  return unsplashResponse.response?.results.map((result) => result.urls.small);
};

// get Foursquare coffee shop API query URL
const getUrlForCoffeeStores = (
  latLong?: string,
  query?: string,
  limit?: number
) => {
  const queryParams = [];
  if (latLong) queryParams.push(`ll=${latLong}`);
  if (query) queryParams.push(`query=${query}`);
  if (limit) queryParams.push(`limit=${limit}`);

  return queryParams.length > 0
    ? `https://api.foursquare.com/v3/places/search?${queryParams.join("&")}`
    : "https://api.foursquare.com/v3/places/search";
};

// Compose and return Foursquare and Unsplash results
export const fetchCoffeeStores = async (
  latLong = "43.68292648169076%2C-79.34346275574839",
  query = "coffee",
  limit = 10
) => {
  // get unsplash photos
  const photos = await getCoffeeStorePhotos();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FSQ_SECRET_TOKEN,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(latLong, query, limit),
    options
  );
  const data = await response.json();

  // .catch((err) => console.error(err));

  return data.results.map((result, index) => {
    const neighborhood = result.location.neighborhood;
    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location.address,
      neighborhood: neighborhood?.length > 0 ? neighborhood[0] : "",
      imgUrl: photos?.length > 0 ? photos[index] : null,
    };
  });
};
