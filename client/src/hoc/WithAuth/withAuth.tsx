'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useUserData } from '@/hooks/useUserData'
import type { ComponentType, JSX } from 'react'

export function withAuth<P extends JSX.IntrinsicAttributes>(
    WrappedComponent: ComponentType<P>,
    allowedRoles: string[] = []
): ComponentType<P> {
    const ProtectedComponent = (props: P) => {
        const { isAuth, role, checked } = useUserData()
        const router = useRouter()

        // Wait until auth is fully checked
        if (!checked) return null

        if (!isAuth || !allowedRoles.includes(role)) {
            router.replace('/')
            return null
        }

        return <WrappedComponent {...props} />
    }

    return ProtectedComponent
}
