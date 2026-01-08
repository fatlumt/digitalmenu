import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import OverviewPage from "./pages/OverviewPage";
import RestaurantsPage from "./pages/RestaurantsPage";
import MenuBuilderPage from "./pages/MenuBuilderPage";
import ThemesPage from "./pages/ThemesPage";
import PublishPage from "./pages/PublishPage";
import PublicMenuPage from "./pages/PublicMenuPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/:restaurantSlug" element={<PublicMenuPage />} />
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<OverviewPage />} />
        <Route path="/dashboard/restaurants" element={<RestaurantsPage />} />
        <Route path="/dashboard/menus" element={<MenuBuilderPage />} />
        <Route path="/dashboard/themes" element={<ThemesPage />} />
        <Route path="/dashboard/publish" element={<PublishPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
