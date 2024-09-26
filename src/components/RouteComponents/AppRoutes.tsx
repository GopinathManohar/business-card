import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoadingComponent from '../CommonComponent/LoadingComponent'
import NotFoundComponent from '../CommonComponent/NotFoundComponent'
import AppLayout from '../Layout/AppLayout'
import { LoginComponent } from "../LoginComponent"
import { CardComponentLoadable } from "../CardComponent"
import ProtectedRoute from './ProtectRoutes'
import EmployeeTableComponent from '../Dashboard/EmployeeTable'


const AppRoutes = () => {

    return (
        <Suspense fallback={<LoadingComponent />}>
            <Routes>
                <Route path='/' element={
                    // <ProtectedRoute>
                    <AppLayout />
                    // </ProtectedRoute>
                }>
                    <Route path='dashboard' element={
                        <EmployeeTableComponent />
                    } />
                    <Route path="/create-card" element={<CardComponentLoadable />} />



                    {/* <Route path='pod-files' element={
                        <PodFilesTableComponentLoadable />
                    } /> */}

                    <Route path="/" element={<LoginComponent />} />
                    <Route path="*" element={<NotFoundComponent />} />

                </Route>
            </Routes >
        </Suspense>

    )
}

export default AppRoutes