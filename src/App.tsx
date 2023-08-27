import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { HomePage } from './features/HomePage/HomePage'
import { Breeds } from './routes/Breeds/Breeds'
import { CoverPoster } from './routes/CoverPoster/CoverPoster'
import { Dislikes } from './routes/Dislikes/Dislikes'
import { Favourites } from './routes/Favorites/Favourites'
import { Likes } from './routes/Likes/Likes'
import { Voting } from './routes/Voting/Voting'

export function App() {
  return (
    <div className="app">
      <HomePage />
      <div className="dynamic-board">
        <Routes>
          <Route path="/" element={<CoverPoster />}></Route>
          <Route path="/voting" element={<Voting />}></Route>
          <Route path="/likes" element={<Likes />}></Route>
          <Route path="/favourites" element={<Favourites />}></Route>
          <Route path="/dislikes" element={<Dislikes />}></Route>
          <Route path="/breeds" element={<Breeds />}></Route>
        </Routes>
      </div>
      <ToastContainer position="bottom-left" autoClose={300} />{' '}
    </div>
  )
}
