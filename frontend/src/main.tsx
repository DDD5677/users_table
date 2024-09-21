import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
const App = lazy(() => import("./pages/App"));
const SignIn = lazy(() => import("./components/SignIn/SignIn"));
const SignUp = lazy(() => import("./components/SignUp/SignUp"));
const router = createBrowserRouter([
   {
      path: "/",
      element: <App />,
   },
   {
      path: "/signin",
      element: <SignIn />,
   },
   {
      path: "/signup",
      element: <SignUp />,
   },
]);

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <Suspense>
         <RouterProvider router={router} />
      </Suspense>
   </StrictMode>
);
