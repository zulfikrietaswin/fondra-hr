'use client';

import {
  BarChart3,
  Bot,
  Building2,
  ClipboardList,
  FileText,
  Handshake,
  LayoutDashboard,
  Settings,
  Sparkles,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { motion } from 'framer-motion';

import { roleAtLeast } from '@/lib/roles';
import { useI18n } from '@/lib/i18n/client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';

import type { Role } from '@/services/auth-context';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getMainNav = (dict: any) => [
  { href: '/dashboard', label: dict.nav?.dashboard || 'ダッシュボード', icon: LayoutDashboard, minRole: 'viewer' as Role },
  { href: '/employees', label: dict.nav?.employees || '従業員', icon: Users, minRole: 'viewer' as Role },
  { href: '/departments', label: dict.nav?.departments || '組織図', icon: Building2, minRole: 'viewer' as Role },
  { href: '/skills', label: dict.nav?.skills || 'スキル', icon: Sparkles, minRole: 'viewer' as Role },
  { href: '/one-on-ones', label: dict.nav?.['1on1s'] || '1on1', icon: Handshake, minRole: 'viewer' as Role },
  { href: '/evaluations', label: dict.nav?.evaluations || '評価', icon: ClipboardList, minRole: 'viewer' as Role },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAdminNav = (dict: any) => [
  { href: '/ai-assistant', label: 'AI アシスタント', icon: Bot, minRole: 'viewer' as Role },
  { href: '/audit-logs', label: '監査ログ', icon: FileText, minRole: 'viewer' as Role },
  { href: '/settings', label: dict.nav?.settings || '設定', icon: Settings, minRole: 'admin' as Role },
];

interface AppSidebarProps {
  role: Role;
  orgName: string;
}

export function AppSidebar({ role, orgName }: AppSidebarProps) {
  const pathname = usePathname();
  const { dict } = useI18n();

  const mainNav = getMainNav(dict);
  const adminNav = getAdminNav(dict);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-sidebar-border border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/dashboard" />}>
              <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <BarChart3 className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">FondraHR</span>
                <span className="text-muted-foreground truncate text-xs">{orgName}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>メニュー</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav
                .filter((item) => roleAtLeast(role, item.minRole))
                .map((item) => (
                  <SidebarMenuItem key={item.href + item.label}>
                    <motion.div whileHover={{ scale: 1.05, x: 5 }} whileTap={{ scale: 0.95 }}>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      render={<Link href={item.href} />}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                    </motion.div>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>管理</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNav
                .filter((item) => roleAtLeast(role, item.minRole))
                .map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <motion.div whileHover={{ scale: 1.05, x: 5 }} whileTap={{ scale: 0.95 }}>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      render={<Link href={item.href} />}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                    </motion.div>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
