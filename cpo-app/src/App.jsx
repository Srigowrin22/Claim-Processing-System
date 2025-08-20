import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import DashboardLayoutBasic from './components/cpo'
import DashboardLayoutBranding from './components/MedicalValidator'
import PolicyHolderDashboard from './components/policyHolder/PolicyHolderDashboard'
import RegionalHeadDashboard from './components/RegionalHead/RegionalHeadDashboard'
import PolicyHolderLoginPage from './components/policyHolder/PolicyHolderLoginPage'
import { Worker } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

function App() {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
      <Routes>
        <Route path='/' element={<DashboardLayoutBasic />} />
        <Route path='/test' element={<DashboardLayoutBranding />} />
        <Route path='/PolicyHolderDashboard' element={<PolicyHolderDashboard />} />
        <Route path='/RHDashboard' element={<RegionalHeadDashboard />} />
        <Route path='/PolicyHolderLogin' element={<PolicyHolderLoginPage />} />
      </Routes>
    </Worker>
  )
}

export default App
