'use client';

import { useState } from 'react';
import {
  Home,
  Search,
  Settings,
  User,
  Mail,
  Github,
  Linkedin,
  Twitter,
  FileText,
  BarChart3,
  Shield,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  onClick?: () => void;
}

interface CylindricalNavbarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export function CylindricalNavbar({ activeSection = 'home', onSectionChange }: CylindricalNavbarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      onClick: () => onSectionChange?.('home'),
    },
    {
      id: 'analysis',
      label: 'Analysis',
      icon: BarChart3,
      onClick: () => onSectionChange?.('analysis'),
    },
    {
      id: 'history',
      label: 'History',
      icon: FileText,
      onClick: () => onSectionChange?.('history'),
    },
    {
      id: 'subscription',
      label: 'Subscription',
      icon: DollarSign,
      onClick: () => onSectionChange?.('subscription'),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      onClick: () => onSectionChange?.('settings'),
    },
  ];

  const handleNavClick = (item: NavItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      window.open(item.href, '_blank');
    }
  };

  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 md:left-[calc(50%+120px)] md:translate-x-[-50%]">
      <div className="flex items-center justify-center gap-2 bg-white/95 backdrop-blur-md border border-primary/20 rounded-full px-6 py-3 shadow-lg">
        {/* Navigation Items */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            const isHovered = hoveredItem === item.id;

            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => handleNavClick(item)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={cn(
                  "relative w-12 h-12 rounded-full transition-all duration-300 overflow-hidden group",
                  isActive && "bg-primary text-white shadow-md",
                  !isActive && "hover:bg-primary/10 text-foreground/70 hover:text-primary"
                )}
              >
                <div className={cn(
                  "absolute inset-0 rounded-full transition-all duration-300",
                  isActive && "bg-primary opacity-100",
                  isHovered && !isActive && "bg-primary/5"
                )} />

                <Icon className={cn(
                  "w-5 h-5 relative z-10 transition-all duration-300",
                  isActive && "scale-110 text-white",
                  isHovered && !isActive && "scale-105"
                )} />

                {/* Tooltip */}
                <div className={cn(
                  "absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1.5 bg-foreground text-background text-xs rounded-lg whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200 shadow-lg",
                  isHovered && "opacity-100"
                )}>
                  {item.label}
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
