import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PesertaListScreen from "./src/screens/PesertaListScreen";
import PesertaFormScreen from "./src/screens/PesertaFormScreen";
import PesertaDetailScreen from "./src/screens/PesertaDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PesertaList"
          component={PesertaListScreen}
          options={{ title: "Data Peserta" }}
        />

        <Stack.Screen
          name="PesertaForm"
          component={PesertaFormScreen}
          options={{ title: "Form Peserta" }}
        />

        <Stack.Screen
          name="PesertaDetail"
          component={PesertaDetailScreen}
          options={{ title: "Detail Peserta" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}