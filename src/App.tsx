import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingComponent from './components/CommonComponent/LoadingComponent';
import { LoginComponent } from './components/LoginComponent';
import { CardComponentLoadable } from './components/CardComponent';
import { OgCard } from './components/CardComponent/OgCard';
import EmployeeTableComponent from './components/Dashboard/EmployeeTable';
import AppRoutes from './components/RouteComponents/AppRoutes';

const App = () => {
  return (
    <Suspense fallback={<LoadingComponent />} >
      <Routes>
        <Route path="/my-card" element={<OgCard />} />
        <Route path="/" element={<LoginComponent />} />
        <Route path="/*" element={<AppRoutes />} />

        <Route path="*" element={<LoginComponent />} />
        {/* <Route element={<RequiredAuthComponent />}>
      </Route> */}
      </Routes>
    </Suspense>
  );
}

export default App;



