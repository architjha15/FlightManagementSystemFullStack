import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


export default function ProtectedRoute(){
// Simple auth guard using token in localStorage; adapt for real auth
const token = localStorage.getItem('fm_token')
if (!token) return <Navigate to={'/'} replace />
return <Outlet />
}