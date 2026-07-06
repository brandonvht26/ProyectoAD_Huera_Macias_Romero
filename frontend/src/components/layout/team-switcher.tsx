import * as React from 'react'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

import logoEpn1 from '@/assets/LOGO_EPN1.svg'

type TeamSwitcherProps = {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}

export function TeamSwitcher({ teams }: TeamSwitcherProps) {
  const activeTeam = teams[0]

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size='lg'
          className='pointer-events-none'
        >
          <div className='flex aspect-square size-10 items-center justify-center bg-transparent overflow-visible'>
            <img src={logoEpn1} alt='Logo EPN' className='size-10 object-contain scale-[1.15]' />
          </div>
          <div className='grid flex-1 text-start text-sm leading-tight'>
            <span className='truncate font-semibold'>
              {activeTeam.name}
            </span>
            <span className='truncate text-xs'>{activeTeam.plan}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
