import "./index.css";

import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import Unit from "./views/Unit.tsx";
import Users from "./views/Users.tsx";
import Course from "./views/Course.tsx";
import Lesson from "./views/Lesson.tsx";
import Request from "./views/Request.tsx";
import { store } from "./states/store.ts";
import Question from "./views/Question.tsx";
import RequireAuth from "./pages/RequireAuth.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"app/course"}/>,
  },
  {
    path: "/app",
    element: <RequireAuth />,
    children: [
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "request",
        element: <Request />,
      },
      {
        path: "course",
        element: <Course />,
      },
      {
        path: "course/:courseId/unit",
        element: <Unit />,
      },
      {
        path: "course/:courseId/unit/:unitId/lesson",
        element: <Lesson />,
      },
      {
        path: "course/:courseId/unit/:unitId/lesson/:lessonId/question",
        element: <Question />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
    <Toaster />
  </StrictMode>
);
