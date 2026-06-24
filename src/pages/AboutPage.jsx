function AboutPage() {
  const concepts = [
    { phase: 'Phase 1', topic: 'Redux Toolkit', desc: 'createSlice, createAsyncThunk, createSelector' },
    { phase: 'Phase 2', topic: 'Debounce + Throttle', desc: 'useDebounce for search, useThrottle for scroll' },
    { phase: 'Phase 3', topic: 'React Router v6', desc: 'nested routes, protected routes, useSearchParams' },
    { phase: 'Phase 4', topic: 'React Hook Form', desc: 'coming soon' },
    { phase: 'Phase 5', topic: 'Advanced Hooks', desc: 'coming soon' },
  ]

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">About this project</h1>
      <p className="text-gray-500 text-sm mb-8">
        A single project covering every important React concept — built as a study reference.
      </p>

      <div className="space-y-3">
        {concepts.map((c) => (
          <div key={c.phase} className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4">
            <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-lg h-fit whitespace-nowrap">
              {c.phase}
            </span>
            <div>
              <p className="font-medium text-gray-800 text-sm">{c.topic}</p>
              <p className="text-xs text-gray-500 mt-0.5">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AboutPage