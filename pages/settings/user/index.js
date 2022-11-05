import React from 'react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Loading } from '../../../src/components'
const UserAdmin = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/settings#team')
  }, [])
  
  return (
    <Loading/>
  )
}

export default UserAdmin