import { BrowserRouter, Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import Spinner from "./components/Spinner";

const LazyElement = lazy(() => import(`./pages/limitMap`));
const LazyElement1 = lazy(() => import(`./pages/freeMap`));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Spinner />}>
              <LazyElement />
            </Suspense>
          }
        />
        <Route
          path="/free"
          element={
            <Suspense fallback={<Spinner />}>
              <LazyElement1 />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
