import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import ErrorElement from "./components/ErrorElement";
import Spinner from "./components/Spinner";

const lazyLoadRoutes = (componentName: string, src = "pages") => {
  const LazyElement = lazy(() => import(`./${src}/${componentName}.tsx`));

  return (
    <Suspense
      fallback={
        <div className="h-dvh bg-white">
          <Spinner />
          <div className="text-center">در حال بارگذاری..</div>
        </div>
      }
    >
      <LazyElement />
    </Suspense>
  );
};

export const router = createBrowserRouter([
  {
    element: lazyLoadRoutes("BlankLayout", "layouts"),
    path: "/",
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: lazyLoadRoutes("limitMap"),
      },
      {
        element: lazyLoadRoutes("freeMap"),
        path: "/free",
      },
      {
        element: lazyLoadRoutes("freeMapCurve"),
        path: "/free-curve",
      },
      {
        element: lazyLoadRoutes("clusterMap"),
        path: "/cluster",
      },
    ],
  },
]);
