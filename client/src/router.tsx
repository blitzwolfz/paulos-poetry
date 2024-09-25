import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import PoetryPage from "./pages/PoetryPage";
import ReviewsPage from "./pages/ReviewsPage";
import TranslationsPage from "./pages/TranslationsPage";
import LoginPage from "./pages/login-register/LoginPage";
import RegisterPage from "./pages/login-register/RegisterPage";

const errorElement = <ErrorPage />;
export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement,
  },
  {
    path: "translations",
    element: <TranslationsPage />,
    errorElement,
  },
  {
    path: "/reviews",
    element: <ReviewsPage />,
    errorElement,
  },
  {
    path: "/poetry",
    element: <PoetryPage />,
    errorElement,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement,
  },
]);
