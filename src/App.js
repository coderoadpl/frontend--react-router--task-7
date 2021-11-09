import React from 'react'

import { Routes, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import NavLink from './components/NavLink'

import PageLogout from './pages/PageLogout'
import PageLogin from './pages/PageLogin'
import PageHome from './pages/PageHome'
import PageMoviesSearch from './pages/PageMoviesSearch'
import PageMoviesSearchResults from './pages/PageMoviesSearchResults'

import { useUser } from './contexts/UserContext'

export const App = () => {
  const { isUserLoggedIn, logIn, logOut } = useUser()

  return (
    <div>
      {
        isUserLoggedIn ?
          <NavBar>
            <NavLink
              to={'/'}
            >
              Home
            </NavLink>
            <NavLink
              to={'/movies/search'}
            >
              Movies search
            </NavLink>
            <NavLink
              to={'/logout'}
            >
              Log out
            </NavLink>
          </NavBar>
          :
          null
      }
      <Routes>
        <Route
          path={'/logout'}
          element={<PageLogout onLogOut={logOut} />}
        />
        {
          !isUserLoggedIn ?
            <Route
              path={'/'}
              element={<PageLogin onLogInClick={logIn} />}
            />
            :
            <>
              <Route
                path={'/'}
                element={<PageHome />}
              />
              <Route
                path={'/movies/search'}
                element={<PageMoviesSearch />}
              >
                <Route
                  path={':searchPhrase'}
                  element={<PageMoviesSearchResults />}
                />
              </Route>
            </>
        }
      </Routes>
    </div>
  )
}

export default App
