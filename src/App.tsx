import { Route, Routes } from 'react-router-dom'
import { HomePage } from './features/HomePage/HomePage'
import { CoverPoster } from './routes/CoverPoster/CoverPoster'
import { Voting } from './routes/Voting/Voting'

export function App() {
  return (
    <div className="app">
      <HomePage />

      <div className="dynamic-board">
        <Routes>
          <Route path="/" element={<CoverPoster />}></Route>
          <Route path="/voting" element={<Voting />}></Route>
        </Routes>
      </div>
    </div>
  )
}
