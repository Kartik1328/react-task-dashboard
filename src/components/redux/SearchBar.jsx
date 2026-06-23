import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '../../store/taskSlice'
import { useDebounce } from '../../hooks/useDebounce'
import { useEffect } from 'react'

function SearchBar() {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')

  // inputValue updates on every keystroke (instant UI feedback)
  // debouncedValue only updates 400ms after user stops typing
  const debouncedValue = useDebounce(inputValue, 400)

  // This effect only fires when debouncedValue changes
  // So the Redux dispatch (and any API call) only happens after typing stops
  useEffect(() => {
    dispatch(setSearchQuery(debouncedValue))
  }, [debouncedValue, dispatch])

  return (
    <div className="relative mb-4">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search tasks... (debounced 400ms)"
        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-gray-400 transition-colors bg-white"
      />
      {/* Show raw vs debounced value — great for learning */}
      {inputValue && (
        <div className="mt-1 flex gap-4 text-xs px-1">
          <span className="text-gray-400">
            Input: <span className="text-gray-600 font-medium">"{inputValue}"</span>
          </span>
          <span className="text-gray-400">
            Debounced: <span className="text-purple-600 font-medium">"{debouncedValue}"</span>
          </span>
        </div>
      )}
    </div>
  )
}

export default SearchBar