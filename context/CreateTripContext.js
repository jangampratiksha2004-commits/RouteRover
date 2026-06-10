import React, { createContext, useState } from "react";

export const CreateTripContext = createContext();

export const CreateTripContextProvider = ({ children }) => {
  const [tripData, setTripData] = useState({
    currentLocation: null,
    locationInfo: null,
    traveler: null,
    startDate: null,
    endDate: null,
    budget: null,
    transportMode: null,
  });

  return (
    <CreateTripContext.Provider value={{ tripData, setTripData }}>
      {children}
    </CreateTripContext.Provider>
  );
};