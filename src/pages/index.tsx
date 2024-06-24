'use client'
import Head from 'next/head'
import Button from '@mui/material/Button'
import CustomTextField from 'src/components/text-field'
import { Box } from '@mui/material'
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import { ReactNode } from 'react'

export default function Home() {
  return <></>
}
Home.getLayout = (page: ReactNode) => <LayoutNotApp> {page} </LayoutNotApp>
