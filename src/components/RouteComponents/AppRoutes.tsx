import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoadingComponent from '../CommonComponent/LoadingComponent'
import NotFoundComponent from '../CommonComponent/NotFoundComponent'
import AppLayout from '../Layout/AppLayout'
import { LoginComponent } from "../LoginComponent"
import { CardComponentLoadable } from "../CardComponent"
import ProtectedRoute from './ProtectRoutes'


const AppRoutes = () => {

    return (
        <Suspense fallback={<LoadingComponent />}>
            <Routes>
                <Route path='/' element={
                    <ProtectedRoute>
                        <AppLayout />
                    </ProtectedRoute>
                }>
                 
                   
                  
                   
                   
                    {/* <Route path='pod-files' element={
                        <PodFilesTableComponentLoadable />
                    } /> */}
                  
                    <Route path="/" element={<CardComponentLoadable />} />
                    <Route path="*" element={<NotFoundComponent />} />

                </Route>
            </Routes >
        </Suspense>

    )
}

export default AppRoutes