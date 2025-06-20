'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { AlignJustify } from 'lucide-react';

export function ShopDropdown() {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-white hover:bg-white/10">
          <AlignJustify className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white rounded-md shadow-md w-48"
      >
        <DropdownMenuItem onClick={() => router.push('/auth/login')}>
          Login
        </DropdownMenuItem>
        {/* <DropdownMenuItem onClick={() => router.push('/start-design')}>
          Start Design
        </DropdownMenuItem> */}
        <DropdownMenuItem onClick={() => router.push('/request-quote')}>
          Request Quote
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/auth/register/sales')}>
          Become a Sales
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/auth/register/distributor')}>
          Become a Distributor
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
