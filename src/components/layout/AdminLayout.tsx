import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Trophy,
  LogOut,
  Menu,
  X,
  User,
  AppWindow,
  Medal,
} from "lucide-react";

// Hook helper for mobile detection
const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

interface MenuItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  isPro?: boolean;
}

export function AdminLayout() {
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMobile();

  const location = useLocation();
  const navigate = useNavigate();

  function checkIsLinkActive(currentPath: string, route: string): boolean {
    const isDashboardRoute = route === "/" || route === "/admin/dashboard";

    return (
      currentPath === route ||
      (!isDashboardRoute &&
        currentPath.startsWith(route) &&
        currentPath.charAt(route.length) === "/")
    );
  }

  const menuItems: MenuItem[] = [
    {
      name: "Página Principal",
      icon: AppWindow,
      path: "/",
    },
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      name: "Socios",
      icon: Users,
      path: "/admin/requests",
    },
    {
      name: "Torneos",
      icon: Trophy,
      path: "/admin/tournaments",
    },
    {
      name: "Torneos",
      icon: Trophy,
      path: "/admin/tournaments-pro",
      isPro: true,
    },
    {
      name: "Ranking",
      icon: Medal,
      path: "/admin/ranking",
      isPro: true,
    },
  ];

  const handleLogout = () => {
    navigate("/admin/login");
  };

  // Determine Sidebar Classes
  const sidebarWidth = isDesktopCollapsed ? "w-20" : "w-64";
  const desktopSidebarClasses = `md:translate-x-0 ${sidebarWidth}`;
  const mobileSidebarClasses = mobileMenuOpen
    ? "translate-x-0 w-64"
    : "-translate-x-full w-64";

  return (
    <div className="min-h-dvh bg-slate-950 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-slate-900 border-b border-white/5 h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -ml-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-bold text-white text-lg tracking-wider">
            ADMIN PANEL
          </span>
          {/* <Link to="/" className="select-none">
            <div className="flex items-center space-x-2">
              <h1 className="font-classy-vogue text-silk-secondary text-4xl">
                Padel
              </h1>
              <span className="px-2 bg-emerald-800 text-white text-sm font-light rounded-sm">
                ADMIN
              </span>
            </div>
          </Link> */}
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 bg-slate-900 border-r border-white/5 flex flex-col transition-all duration-300
          ${isMobile ? mobileSidebarClasses : desktopSidebarClasses}
        `}
      >
        {/* Sidebar Header (Hidden on mobile generally, or different) */}
        <div
          className={`h-16 flex items-center justify-between px-4 border-b border-white/5 ${isMobile ? "justify-between" : ""}`}
        >
          {/* On mobile, show Logo + Close button. On Desktop, show Logo + Collapse button */}

          {!isDesktopCollapsed && (
            <span className="font-bold text-white text-lg tracking-wider">
              {isMobile ? "MENU" : "ADMIN PANEL"}
            </span>
          )}
          {isDesktopCollapsed && !isMobile && (
            <span className="font-bold text-white text-lg mx-auto">AP</span>
          )}

          {isMobile ? (
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors ml-auto"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
              className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors ml-auto"
            >
              {isDesktopCollapsed ? (
                <Menu className="w-5 h-5" />
              ) : (
                <X className="w-5 h-5" />
              )}
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = checkIsLinkActive(location.pathname, item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => isMobile && setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all group ${
                  isActive
                    ? item.isPro
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-blue-600/10 text-blue-400"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                } ${isDesktopCollapsed && !isMobile ? "justify-center" : ""}`}
                title={isDesktopCollapsed ? item.name : undefined}
              >
                <item.icon
                  className={`w-5 h-5 shrink-0 ${
                    isActive
                      ? item.isPro
                        ? "text-yellow-400"
                        : "text-blue-400"
                      : item.isPro
                        ? "text-yellow-500/70 group-hover:text-yellow-400"
                        : "text-slate-400 group-hover:text-white"
                  }`}
                />
                {(!isDesktopCollapsed || isMobile) && (
                  <span className="font-medium text-sm flex items-center gap-2">
                    {item.name}
                    {item.isPro && (
                      <span className="text-[10px] font-bold bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded border border-yellow-500/30">
                        V2
                      </span>
                    )}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-white/5">
          <div
            className={`flex items-center gap-3 ${
              isDesktopCollapsed && !isMobile ? "justify-center" : ""
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-500 to-indigo-500 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>
            {(!isDesktopCollapsed || isMobile) && (
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-white truncate">
                  Admin User
                </p>
                <p className="text-xs text-slate-500 truncate">
                  admin@padelmdp.com
                </p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className={`mt-4 w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors ${
              isDesktopCollapsed && !isMobile ? "justify-center" : ""
            }`}
            title={isDesktopCollapsed ? "Cerrar Sesión" : undefined}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {(!isDesktopCollapsed || isMobile) && (
              <span className="text-sm font-medium">Salir</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`
          flex-1 transition-all duration-300
          ${isMobile ? "pt-20" : ""}
          ${!isMobile ? (isDesktopCollapsed ? "ml-20" : "ml-64") : ""}
          p-4 md:p-8
        `}
      >
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Backdrop */}
      {isMobile && mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
