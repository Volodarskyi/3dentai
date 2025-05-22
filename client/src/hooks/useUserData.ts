import {useEffect, useState} from "react";
import {getAccessToken} from "@/utils/cookieUtils";
import {jwtDecode} from "@/utils/authUtils";

type UserData = {
    isAuth: boolean
    role: string
    firstName: string
    lastName: string
    checked: boolean // <- New
}

export const useUserData = (): UserData => {
    const [userData, setUserData] = useState<UserData>({
        isAuth: false,
        role: '',
        firstName: '',
        lastName: '',
        checked: false,
    })

    useEffect(() => {
        const token = getAccessToken()
        if (!token) {
            setUserData((prev) => ({ ...prev, checked: true }))
            return
        }

        try {
            const { payload } = jwtDecode(token)
            const { firstName, lastName, role } = payload

            setUserData({
                isAuth: true,
                role,
                firstName,
                lastName,
                checked: true,
            })
        } catch (e) {
            console.error('[useUserData] decode failed', e)
            setUserData((prev) => ({ ...prev, checked: true }))
        }
    }, [])

    return userData
}
