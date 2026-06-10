import React from "react";
import { Stack } from "expo-router";
import { CreateTripContextProvider } from "../context/CreateTripContext";

export default function RootLayout() {


  return (
    <CreateTripContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="tabs" /> {/* or (tabs) if you rename folder */}
      </Stack>
    </CreateTripContextProvider>
  );
}
