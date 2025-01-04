import { BrowserRouter, Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import Spinner from "./components/Spinner";

function lazyLoadRoutes(componentName: string, src: string = "pages") {
  const LazyElement = lazy(
    () => import(/* @vite-ignore */ `./${src}/${componentName}`)
  );

  return (
    <Suspense fallback={<Spinner />}>
      <LazyElement />
    </Suspense>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={lazyLoadRoutes("limitMap")} />
        <Route path="/free" element={lazyLoadRoutes("freeMap")} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
