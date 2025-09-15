import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../src/components/MainLayout";
import HomePage from "./pages/HomePage";
import VenuePage from "./pages/SpecificVenuePage";
import VenueList from "./components/VenueLists";
import MainContent from "./components/MainContent";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="venues" element={<MainContent />} />
        </Route>
        <Route path="venues/:id" element={<VenuePage />} />
        <Route path="login" element={<LoginPage />} />
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
