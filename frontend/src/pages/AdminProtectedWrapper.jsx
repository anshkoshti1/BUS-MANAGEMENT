import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AdminDataContext } from '../context/AdminContext'

const AdminProtectedWrapper = ({children}) => {
    const token = localStorage.getItem('token')
    const { setAdmin } = useContext(AdminDataContext)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    

    useEffect(()=>{
        if(!token){
            navigate('/admin-login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/admin/profile`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            if(response.status === 200){
                const data = response.data
                setAdmin(data.admin)
                setIsLoading(false)
            }
        }).catch((error)=>{
            console.log(error)
            localStorage.removeItem('token')
            navigate('/admin-login')
        })

    },[token])

    if(isLoading){
        return <div>Loading...</div>
    }

    return (
        <>
            {children}
        </>
    )
}

export default AdminProtectedWrapper