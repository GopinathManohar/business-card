import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingComponent from './components/CommonComponent/LoadingComponent';
import { LoginComponent } from './components/LoginComponent';
import { CardComponentLoadable } from './components/CardComponent';
import AppRoutes from './components/RouteComponents/AppRoutes';

const App = () => {
  return (
    <Suspense fallback={<LoadingComponent />} >
      <Routes>
        <Route path="/" element={<CardComponentLoadable />} />
        <Route path="/*" element={<AppRoutes />} />
        <Route path="*" element={<LoginComponent />} />
        {/* <Route element={<RequiredAuthComponent />}>
      </Route> */}
      </Routes>
    </Suspense>
  );
}

export default App;



