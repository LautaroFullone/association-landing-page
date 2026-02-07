import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";
import { TournamentsPage } from "@/pages/TournamentsPage";
import { TournamentDetailPage } from "@/pages/TournamentDetailPage";
import { RankingPage } from "@/pages/RankingPage";
import { LoginPage } from "@/pages/admin/LoginPage";
import { Dashboard } from "@/pages/admin/Dashboard";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { MembershipRequests } from "@/pages/admin/MembershipRequests";
import { TournamentsList } from "@/pages/admin/TournamentsList";
import { TournamentDetail } from "@/pages/admin/TournamentDetail";
import { TournamentCreate } from "@/pages/admin/TournamentCreate";
import { TournamentsProList } from "@/pages/admin/TournamentsProList";
import { TournamentProDetail } from "@/pages/admin/TournamentProDetail";
import { NewTournamentPro } from "@/pages/admin/NewTournamentPro";
import { RankingAdmin } from "@/pages/admin/RankingAdmin";
import { ScrollToAnchor } from "@/components/ScrollToAnchor";

function App() {
  return (
    <Router>
      <ScrollToAnchor />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/torneos" element={<TournamentsPage />} />
        <Route path="/torneos/:id" element={<TournamentDetailPage />} />
        <Route path="/ranking" element={<RankingPage />} />
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
          <Route path="tournaments-pro/new" element={<NewTournamentPro />} />
          <Route path="tournaments-pro/:id" element={<TournamentProDetail />} />

          {/* Ranking */}
          <Route path="ranking" element={<RankingAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
