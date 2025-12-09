'use client';

import { Bell, User, Settings, CreditCard, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface DashboardHeaderProps {
  title?: string;
  showSearch?: boolean;
}

export default function DashboardHeader({
  title = 'Dashboard',
  showSearch = false
}: DashboardHeaderProps) {
  const handleSignOut = () => {
    // TODO: Implement sign out logic
    console.log('Sign out clicked');
  };

  const handleProfileClick = () => {
    // TODO: Navigate to profile page
    console.log('Profile clicked');
  };

  const handleSettingsClick = () => {
    // TODO: Navigate to settings page
    console.log('Settings clicked');
  };

  const handleBillingClick = () => {
    // TODO: Navigate to billing page
    console.log('Billing clicked');
  };

  const handleNotificationsClick = () => {
    // TODO: Open notifications panel
    console.log('Notifications clicked');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left: Page Title */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        </div>

        {/* Center: Search Bar (Optional) */}
        {showSearch && (
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <Input
              type="search"
              placeholder="Search..."
              className="w-full"
            />
          </div>
        )}

        {/* Right: Notification Bell + User Menu */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-gray-600 hover:text-gray-900"
            onClick={handleNotificationsClick}
          >
            <Bell className="h-5 w-5" />
            {/* Notification Badge */}
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500" />
          </Button>

          {/* User Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-10 w-10 border-2 border-blue-500">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-blue-500 text-white">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleProfileClick}
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleSettingsClick}
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleBillingClick}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-red-600 focus:text-red-600"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
