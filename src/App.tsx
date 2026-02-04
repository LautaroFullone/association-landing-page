import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";
import { LoginPage } from "@/pages/admin/LoginPage";
import { Dashboard } from "@/pages/admin/Dashboard";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { MembershipRequests } from "@/pages/admin/MembershipRequests";
import { TournamentsList } from "@/pages/admin/TournamentsList";
import { TournamentDetail } from "@/pages/admin/TournamentDetail";
import { TournamentCreate } from "@/pages/admin/TournamentCreate";
import { TournamentsProList } from "@/pages/admin/TournamentsProList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Admin Routes with Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="requests" element={<MembershipRequests />} />
          <Route path="tournaments" element={<TournamentsList />} />
          <Route path="tournaments/new" element={<TournamentCreate />} />
          <Route path="tournaments/:id" element={<TournamentDetail />} />
          {/* Torneos PRO */}
          <Route path="tournaments-pro" element={<TournamentsProList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
