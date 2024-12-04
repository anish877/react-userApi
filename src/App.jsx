import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Loader2, RefreshCcw, UserPlus } from 'lucide-react'

function App() {
  const [users, setUsers] = useState([])
  const [numberOfUsers, setNumberOfUsers] = useState(5)
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)

  const fetchUser = async (numberOfUsers) => {
    setIsFetching(true)
    setError(null)
    try {
      const response = await axios.get(`https://randomuser.me/api/?results=${numberOfUsers}`)
      setUsers(prevUsers => [...prevUsers, ...response.data.results])
    } catch (error) {
      console.error(error)
      setError('Failed to fetch users. Please try again.')
    } finally {
      setIsFetching(false)
    }
  }

  const handleMoreUsers = () => {
    if (numberOfUsers > 0 && numberOfUsers <= 100) {
      fetchUser(numberOfUsers)
    }
  }

  const resetUsers = () => {
    setUsers([])
    fetchUser(numberOfUsers)
  }

  useEffect(() => {
    fetchUser(numberOfUsers)
  }, [])

  if(isFetching && users.length === 0){ 
    return(
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-cyan-900 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center items-center mb-4">
          <Loader2 
            className="animate-spin text-cyan-400 hover:text-cyan-300 transition-colors duration-300" 
            size={64} 
          />
        </div>
        <div className="animate-pulse">
          <h2 className="text-2xl font-bold text-gray-200 mb-2">Loading Users</h2>
          <p className="text-gray-400 text-sm">Generating random profiles...</p>
        </div>
      </div>
    </div>
  )}

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-cyan-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-400 flex items-center">
            <UserPlus className="mr-4" /> Random Users Directory
          </h1>
          <button 
            onClick={resetUsers} 
            disabled={isFetching}
            className="bg-cyan-700 text-white px-4 py-2 rounded-md hover:bg-cyan-600 
                       transition-colors disabled:opacity-50 flex items-center"
          >
            <RefreshCcw className="mr-2" size={20} />
            Reset Users
          </button>
        </div>

        {error && (
          <div className="bg-red-600/20 border border-red-500 text-red-300 p-4 rounded-md mb-6 text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map((user, index) => (
            <div 
              key={`${user.login.uuid}-${index}`} 
              className="bg-zinc-800/60 rounded-xl shadow-2xl overflow-hidden 
                          transform transition-all hover:scale-105 hover:shadow-cyan-500/50 
                          border border-zinc-700 backdrop-blur-sm"
            >
              <div className="relative">
                <img 
                  src={user.picture.large} 
                  alt={`${user.name.first} ${user.name.last}`} 
                  className="w-full h-64 object-cover filter brightness-90"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3">
                  <h2 className="text-xl font-semibold text-cyan-300 truncate">
                    {user.name.first} {user.name.last}
                  </h2>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-cyan-500">📧</span>
                  <p className="text-gray-300 truncate">{user.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-cyan-500">📍</span>
                  <p className="text-gray-300 truncate">
                    {user.location.city}, {user.location.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-4">
            <input 
              type="number" 
              value={numberOfUsers}
              onChange={e => setNumberOfUsers(Number(e.target.value))}
              min={1} 
              max={100} 
              className="bg-zinc-800 text-white px-4 py-2 rounded-md 
                         border border-zinc-700 focus:outline-none 
                         focus:ring-2 focus:ring-cyan-500 w-36"
              placeholder="Users to load"
            />
            <button 
              onClick={handleMoreUsers} 
              disabled={isFetching || numberOfUsers < 1 || numberOfUsers > 100}
              className="bg-cyan-600 text-white px-6 py-2 rounded-md 
                         hover:bg-cyan-700 transition-colors 
                         disabled:opacity-50 disabled:cursor-not-allowed 
                         flex items-center"
            >
              {isFetching ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={20} />
                  Loading...
                </>
              ) : (
                'Load More Users'
              )}
            </button>
          </div>
          {(numberOfUsers < 1 || numberOfUsers > 100) && (
            <p className="text-red-400 text-sm">
              Please enter a number between 1 and 100
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App