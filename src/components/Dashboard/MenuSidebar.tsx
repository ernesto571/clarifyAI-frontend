import { X, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { accountLinks, tips, toolLinks } from "../../constants";
import { useAuthStore } from "../../store/AuthStore";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuSidebar({ isOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
      navigate("/");
    }
  };

  const nameParts = user?.name?.split(" ") || [];
  const firstName = nameParts[0] || "Guest";
  const initials = nameParts.length >= 2 
    ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase() 
    : firstName.slice(0, 2).toUpperCase();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-[59%] max-w-[300px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-2 py-5 border-b border-gray-100">
          <h2 className="font-cabinet font-bold text-gray-900">Menu</h2>
          <button
            className="text-primary bg-tet hover:scale-105 rounded-full p-2 transition-transform"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-6">
          <div className="mb-8">
            <h3 className="text-[0.7rem] text-gray-400 font-cabinet px-2 font-bold tracking-widest uppercase">Tools</h3>
            <div className="mt-3 flex flex-col">
              {toolLinks.map((t) => (
                <NavLink
                  to={t.to}
                  end={t.end}
                  key={t.id}
                  onClick={onClose}
                  className={({ isActive }) => `flex items-center gap-3 py-3 px-6 text-[0.85rem] transition-all
                    ${isActive 
                      ? "text-gray-900 font-bold bg-[#fff9d6] border-l-[4px] border-[#ffd600]" 
                      : "text-gray-500 font-semibold hover:bg-gray-50 hover:text-gray-900"}`}
                >
                  <img src={t.icon} alt="" className="w-4 h-4 opacity-70" />
                  <span>{t.label}</span>
                </NavLink>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[0.7rem] text-gray-400 font-cabinet px-2 font-bold tracking-widest uppercase">Account</h3>
            <div className="mt-3 flex flex-col">
              {accountLinks.map((t) => (
                <NavLink
                  to={t.to}
                  key={t.id}
                  end={t.end}
                  onClick={onClose}
                  className={({ isActive }) => `flex items-center gap-3 py-3 px-6 text-[0.85rem] transition-all
                    ${isActive 
                      ? "text-gray-900 font-bold bg-[#fff9d6] border-r-[4px] border-[#ffd600]" 
                      : "text-gray-500 font-semibold hover:bg-gray-50 hover:text-gray-900"}`}
                >
                  <img src={t.icon} alt="" className="w-4 h-4 opacity-70" />
                  <span>{t.label}</span>
                </NavLink>
              ))}

              {user && (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 py-3 px-6 text-[0.85rem] text-red-500 font-semibold hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Log Out</span>
                </button>
              )}
            </div>
          </div>

            {/* tips */}
            <div className="md:hidden mt-4 font-cabinet">
                <h1 className="text-gray-500 font-semibold text-[0.83rem] pl-2">💡 TIPS</h1>

                <div className="flex-col flex gap-3 items-center font-satoshi mt-3">
                    { tips.map( (t) => (
                        <p className="text-[0.8rem] text-gray-700  p-2 gray rounded-lg" key={t.id}>{t.text} </p>
                    )) }
                </div>
            </div>
        </div>

        {/* Footer Profile */}
        <div className="border-t border-gray-100 p-5 bg-gray-50/50">
          <div className="flex gap-3 items-center">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-tet text-primary font-bold text-[0.8rem] shadow-sm">
              {user ? initials : "GU"}
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-900 font-cabinet font-bold leading-none mb-1">
                {user ? firstName : "Guest"}
              </p>
              <p className="text-[0.7rem] text-gray-400 font-medium">Free Plan</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}