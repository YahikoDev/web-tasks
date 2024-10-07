import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "primereact/resources/themes/bootstrap4-light-purple/theme.css";
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.tsx'
import { ContextProvider } from './components/context/ContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>,
)
