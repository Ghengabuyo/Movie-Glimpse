import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import NameProvider from "./Contexts/NameProvider";

import HomePage from "./Pages/HomePage";
import MainPage from "./Pages/MainPage";
import ContentPage from "./Pages/ContentPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/MainPage",
      element: <MainPage />,
    },
    {
      path: "/Movie/:id",
      element: <ContentPage />,
    },
  ]);

  return (
    <NameProvider>
      <ChakraProvider >
        <RouterProvider router={router} />
      </ChakraProvider>
    </NameProvider>
  );
}

export default App;
