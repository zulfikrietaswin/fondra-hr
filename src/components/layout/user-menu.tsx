'use client';

import { LogOut, User } from 'lucide-react';
import { useTransition } from 'react';

import { signOut } from '@/app/(auth)/actions';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n/client';

interface UserMenuProps {
  email: string;
}

export function UserMenu({ email }: UserMenuProps) {
  const [isPending, startTransition] = useTransition();
  const { dict, locale, setLocale } = useI18n();
  const initials = email.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="ユーザーメニュー"
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="text-muted-foreground truncate text-xs font-normal">{email}</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuLabel className="text-xs">Language / 言語 / Bahasa</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setLocale('en')} className={locale === 'en' ? 'bg-muted' : ''}>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLocale('id')} className={locale === 'id' ? 'bg-muted' : ''}>
            Bahasa Indonesia
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLocale('ja')} className={locale === 'ja' ? 'bg-muted' : ''}>
            日本語
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem disabled={isPending} onClick={() => startTransition(() => signOut())}>
            <LogOut className="mr-2 h-4 w-4" />
            {dict.auth?.logout || 'ログアウト'}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
