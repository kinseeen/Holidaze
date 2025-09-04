import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../src/components/MainLayout";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* MainLayout wraps all pages */}
        <Route path="/" element={<MainLayout />}>
          {/* Landing page */}
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import React from "react";
// import MainLayout from "../src/components/MainLayout";
// function App() {
//   return (
//     <div>
//       <main>
//         <MainLayout />
//       </main>
//     </div>
//   );
// }

// export default App;
