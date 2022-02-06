import React, { useState } from "react";

import "./src/services/supabase/initSupabase";

import { NativeBaseProvider, Text, Box } from "native-base";

import { Navigation } from "./src/infrastructure/navigation/index";

import { theme } from "./src/infrastructure/theme/nativebase-custom-theme";
import { DeliveriesContextProvider } from "./src/services/deliveries/Deliveries.context";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["NativeBase:"]);

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <DeliveriesContextProvider>
        <Navigation />
      </DeliveriesContextProvider>
    </NativeBaseProvider>
  );
}
