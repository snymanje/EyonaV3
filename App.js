import React, { useState } from "react";
import { NativeBaseProvider, Text, Box } from "native-base";

import { Navigation } from "./src/infrastructure/navigation/index";

import { theme } from "./src/infrastructure/theme/nativebase-custom-theme";

export default function App() {
  const [service, setService] = useState("");
  return (
    <NativeBaseProvider theme={theme}>
      <Navigation />
    </NativeBaseProvider>
  );
}
