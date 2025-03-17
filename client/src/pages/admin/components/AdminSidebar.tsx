import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Home,
  Building2,
  FileText,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import useLocalStorage from '@/hooks/useLocalStorage';

type SidebarProps = {
  mobile: boolean;
  setMobileOpen?: (open: boolean) => void;
};

const AdminSidebar = ({ mobile, setMobileOpen }: SidebarProps) => {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useLocalStorage('sidebar-collapsed', false);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const closeMobileSidebar = () => {
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: 'Properties',
      href: '/admin/properties',
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      name: 'Blog Posts',
      href: '/admin/blog',
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: 'Messages',
      href: '/admin/messages',
      icon: <Mail className="h-5 w-5" />,
    },
    {
      name: 'Website',
      href: '/',
      icon: <Home className="h-5 w-5" />,
    },
  ];

  return (
    <div
      className={cn(
        'bg-[#2C3E50] text-white h-screen flex flex-col transition-all duration-300',
        mobile ? 'w-full' : collapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-white/10">
        {!collapsed && !mobile && (
          <span className="font-['Playfair_Display'] text-xl font-bold">
            Nainaland<span className="text-[#E74C3C]">Admin</span>
          </span>
        )}
        {mobile && (
          <div className="flex justify-between w-full items-center">
            <span className="font-['Playfair_Display'] text-xl font-bold">
              Nainaland<span className="text-[#E74C3C]">Admin</span>
            </span>
            <Button variant="ghost" onClick={closeMobileSidebar} className="text-white">
              <X className="h-6 w-6" />
            </Button>
          </div>
        )}
        {!mobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleCollapse}
            className="text-white"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="flex-1 py-6 overflow-y-auto">
        <ul className="space-y-2 px-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>
                <a
                  className={cn(
                    'flex items-center rounded-lg p-3 hover:bg-white/10 transition-colors',
                    location === item.href && 'bg-white/20',
                    collapsed && !mobile ? 'justify-center' : ''
                  )}
                  onClick={mobile ? closeMobileSidebar : undefined}
                >
                  {item.icon}
                  {(!collapsed || mobile) && (
                    <span className="ml-3">{item.name}</span>
                  )}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t border-white/10">
        <Link href="/admin/settings">
          <a
            className={cn(
              'flex items-center rounded-lg p-3 hover:bg-white/10 transition-colors',
              location === '/admin/settings' && 'bg-white/20',
              collapsed && !mobile ? 'justify-center' : ''
            )}
            onClick={mobile ? closeMobileSidebar : undefined}
          >
            <Settings className="h-5 w-5" />
            {(!collapsed || mobile) && <span className="ml-3">Settings</span>}
          </a>
        </Link>
        <Button
          variant="ghost"
          className={cn(
            'w-full flex items-center rounded-lg p-3 hover:bg-white/10 transition-colors text-white justify-start',
            collapsed && !mobile ? 'justify-center' : ''
          )}
          onClick={() => {
            // Handle logout logic here
            window.location.href = '/';
          }}
        >
          <LogOut className="h-5 w-5" />
          {(!collapsed || mobile) && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
