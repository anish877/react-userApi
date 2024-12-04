import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Loader2 } from 'lucide-react'

function App() {
  const [users, setUsers] = useState([])
  const [numberOfUsers, setNumberOfUsers] = useState(5)
  const [isFetching, setIsFetching] = useState(false)

  const fetchUser = async (numberOfUsers) => {
    setIsFetching(true)
    try {
      const response = await axios.get(`https://randomuser.me/api/?results=${numberOfUsers}`)
      setUsers(prevUsers => [...prevUsers, ...response.data.results])
    } catch (error) {
      console.error(error)
    } finally {
      setIsFetching(false)
    }
  }

  const handleMoreUsers = () => {
    fetchUser(numberOfUsers)
  }

  useEffect(() => {
    fetchUser(numberOfUsers)
  }, [])

  if(isFetching){ return(
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-cyan-950 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center items-center mb-4">
          <Loader2 
            className="animate-spin text-cyan-500 hover:text-cyan-300 transition-colors duration-300" 
            size={64} 
          />
        </div>
        <div className="animate-pulse">
          <h2 className="text-2xl font-bold text-gray-200 mb-2">Loading</h2>
          <p className="text-gray-400 text-sm">Please wait while we prepare your content</p>
        </div>
      </div>
    </div>
  )}else{

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 text-cyan-500">Random Users</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user, index) => (
            <div 
              key={`${user.login.uuid}-${index}`} 
              className="bg-zinc-900 rounded-lg shadow-2xl overflow-hidden transform transition-all hover:scale-105 border border-zinc-800"
            >
              <img 
                src={user.picture.medium} 
                alt={`${user.name.first} ${user.name.last}`} 
                className="w-24 h-24 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-cyan-400">
                  {user.name.first} {user.name.last}
                </h2>
                <p className="text-zinc-400">
                  {user.email}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mb-6">
          <input 
            type="number" 
            onChange={e => setNumberOfUsers(Number(e.target.value))}
            min={1} 
            max={100} 
            className="bg-zinc-900 text-white px-4 py-2 rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Number of users to load"
          />
        </div>
        <div className="flex justify-center mt-10">
          <button 
            onClick={handleMoreUsers} 
            disabled={isFetching}
            className="bg-cyan-600 text-white px-6 py-3 rounded-md hover:bg-cyan-700 
                       transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isFetching ? 'Loading...' : 'Load More Users'}
          </button>
        </div>
      </div>
    </div>
  )
}}

export default App