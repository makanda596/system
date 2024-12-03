import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer'
import { AuthProvide } from './context/AuthContext'

export default function App() {
  return (
    <div>

      <main className='min-h-screen'>
        <Outlet />
      </main>

    </div>
  )
}
