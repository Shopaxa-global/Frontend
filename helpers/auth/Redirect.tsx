"use client";

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Prop {
    to: string
}

const Redirect = ({to}: Prop) =>{
    const router = useRouter()

    useEffect(()=>{
        router.push(to)
    },[to, router])

    return null
}

export default Redirect