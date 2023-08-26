import { Route, Routes } from 'react-router-dom'
import { CoverPoster } from './components/CoverPoster'
import { HomePage } from './features/HomePage/HomePage'

export function App() {
  return (
    <div className="app">
      <HomePage />

      <div className="cover-poster">
        <Routes>
          <Route path="/" element={<CoverPoster />}></Route>
        </Routes>
      </div>
    </div>
  )
}
