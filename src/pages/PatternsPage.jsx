import { useState } from 'react'
import { useSelector } from 'react-redux'
import Tabs from '../components/patterns/Tabs'
import DataFetcher from '../components/patterns/DataFetcher'
import Modal from '../components/patterns/Modal'
import withLogger from '../components/patterns/withLogger'
import TaskStats from '../components/TaskStats'
import { selectAllTasks } from '../store/taskSlice'

// Apply HOC to TaskStats — wrap it with render logger
const LoggedTaskStats = withLogger(TaskStats)

function PatternsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const tasks = useSelector(selectAllTasks)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Advanced Patterns</h1>
      <p className="text-sm text-gray-500 mb-6">
        Compound components, render props, HOCs, portals
      </p>

      {/* ── Pattern 1: Compound Components ── */}
      <section className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="font-semibold text-gray-800">Compound Components</h2>
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
            Tabs
          </span>
        </div>

        <Tabs defaultTab={0}>
          <Tabs.List>
            <Tabs.Tab>Overview</Tabs.Tab>
            <Tabs.Tab>Tasks</Tabs.Tab>
            <Tabs.Tab>API Data</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel index={0}>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Compound components share state via Context internally.</p>
              <p>The user composes <code className="bg-gray-100 px-1 rounded">Tabs.Tab</code> and{' '}
                <code className="bg-gray-100 px-1 rounded">Tabs.Panel</code> like HTML — no prop passing needed.</p>
              <p className="text-gray-400 text-xs mt-3">
                Used by: Radix UI, Headless UI, React Select, Reach UI
              </p>
            </div>
          </Tabs.Panel>

          <Tabs.Panel index={1}>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 mb-3">
                You have <strong>{tasks.length}</strong> tasks in Redux store:
              </p>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {tasks.slice(0, 5).map((task) => (
                  <div key={task.id}
                    className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 truncate">{task.title}</span>
                    <span className={`px-2 py-0.5 rounded-full font-medium
                      ${task.status === 'done' ? 'bg-green-100 text-green-700' :
                        task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-600'}`}>
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Tabs.Panel>

          <Tabs.Panel index={2}>
            {/* ── Pattern 2: Render Props ── */}
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-sm font-semibold text-gray-700">Render Props inside Tab</h3>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                DataFetcher
              </span>
            </div>
            <DataFetcher url="https://jsonplaceholder.typicode.com/users?_limit=3">
              {({ data, loading, error }) => {
                if (loading) return (
                  <p className="text-sm text-gray-400 animate-pulse">Fetching users...</p>
                )
                if (error) return (
                  <p className="text-sm text-red-500">Error: {error}</p>
                )
                return (
                  <div className="space-y-2">
                    {data?.map((user) => (
                      <div key={user.id}
                        className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                        <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center
                          justify-center text-xs font-bold text-purple-600">
                          {user.name[0]}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-700">{user.name}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              }}
            </DataFetcher>
          </Tabs.Panel>
        </Tabs>
      </section>

      {/* ── Pattern 3: HOC ── */}
      <section className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="font-semibold text-gray-800">HOC — withLogger</h2>
          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
            Higher Order Component
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          The orange badge on each stat card shows render count.
          Open console to see prop change logs.
        </p>
        {/* LoggedTaskStats = withLogger(TaskStats) */}
        <LoggedTaskStats />
      </section>

      {/* ── Pattern 4: Portal ── */}
      <section className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="font-semibold text-gray-800">Portal — Modal</h2>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
            createPortal
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Modal renders in <code className="bg-gray-100 px-1 rounded">#portal-root</code> outside
          the React app root — inspect the DOM to verify.
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700"
        >
          Open Portal Modal
        </button>

        {/* This renders in #portal-root, not here in the DOM */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Portal Modal"
        >
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              This modal is rendered in <code className="bg-gray-100 px-1 rounded">#portal-root</code>,
              completely outside the React app root div.
            </p>
            <p className="text-sm text-gray-600">
              But it still has access to Redux store, Context, and all React features
              because Portal only changes DOM placement — not React tree position.
            </p>
            <p className="text-xs text-gray-400">
              Press Escape or click backdrop to close.
            </p>
            <button
              onClick={() => setModalOpen(false)}
              className="w-full bg-gray-800 text-white rounded-lg py-2 text-sm font-medium mt-2"
            >
              Close
            </button>
          </div>
        </Modal>
      </section>

      {/* Pattern summary */}
      <div className="bg-gray-50 rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-800 mb-4">Pattern cheat sheet</h2>
        <div className="space-y-3">
          {[
            {
              pattern: 'Compound components',
              use: 'Reusable UI kits — Tabs, Accordion, Select',
              how: 'Parent holds state via Context, children consume it'
            },
            {
              pattern: 'Render props',
              use: 'Share logic, let caller control rendering',
              how: 'children or a prop is a function that receives data'
            },
            {
              pattern: 'HOC',
              use: 'Cross-cutting concerns — auth, logging, analytics',
              how: 'Function takes component, returns enhanced component'
            },
            {
              pattern: 'Portal',
              use: 'Modals, tooltips, dropdowns — escape CSS constraints',
              how: 'createPortal renders into a separate DOM node'
            },
          ].map((item) => (
            <div key={item.pattern}
              className="flex gap-4 p-3 bg-white rounded-lg border border-gray-100">
              <code className="text-xs font-mono text-purple-600 bg-purple-50 px-2 py-1 rounded h-fit whitespace-nowrap">
                {item.pattern}
              </code>
              <div>
                <p className="text-sm font-medium text-gray-700">{item.use}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.how}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PatternsPage