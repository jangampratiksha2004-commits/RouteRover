export const extractLocationContext = (tripData) => {
  if (!tripData) return null;
  return {
    city: tripData?.locationInfo?.name || tripData?.destination || 'Pune',
    state: tripData?.locationInfo?.state || 'Maharashtra',
    country: tripData?.locationInfo?.country || 'India',
  };
};
