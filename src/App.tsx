import { useState } from 'react'
import './App.css'
import { Spin } from 'antd';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { UserAuth } from './router';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import DashboardLayout from './layouts';

function App() {
  const [loading, setLoading] = useState<boolean>(false);

  window.loading = (state) => {
    setLoading(state);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={(
          <UserAuth>
            <Navigate to='/user/view' replace />
          </UserAuth>
        )} />
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={<DashboardLayout />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Spin spinning={loading} fullscreen></Spin>
    </BrowserRouter>
  )
}

export default App
