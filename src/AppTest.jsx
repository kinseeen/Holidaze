import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../src/components/MainLayout";
import HomePage from "./pages/HomePage";
import VenuePage from "./pages/SpecificVenuePage";
import VenueList from "./components/VenueLists";
import MainContent from "./components/MainContent";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import DefaultLayout from "./components/DefaultLayout";
import RegisterUserPage from "./pages/RegisterUserPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route element={<DefaultLayout />}>
          <Route path="venues/:id" element={<VenuePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/profile/:name" element={<ProfilePage />} />
          <Route path="/register" element={<RegisterUserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
