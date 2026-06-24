import { createContext, useContext, useState } from 'react'

// Internal context — not exported, only for Tabs family
const TabsContext = createContext(null)

function useTabsContext() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tabs components must be used inside <Tabs>')
  return ctx
}

// ─── Parent ───────────────────────────────────────────────────────
function Tabs({ children, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="w-full">
        {children}
      </div>
    </TabsContext.Provider>
  )
}

// ─── Tab list wrapper ─────────────────────────────────────────────
function TabList({ children }) {
  return (
    <div className="flex border-b border-gray-200 mb-4">
      {/* Clone each child (Tab) and inject its index */}
      {children.map((child, index) =>
        // React.cloneElement adds extra props to existing JSX
        // This is how parent passes index to each Tab without user doing it
        <child.type
          key={index}
          {...child.props}
          index={index}
        />
      )}
    </div>
  )
}

// ─── Individual tab button ────────────────────────────────────────
function Tab({ children, index }) {
  const { activeTab, setActiveTab } = useTabsContext()
  const isActive = activeTab === index

  return (
    <button
      onClick={() => setActiveTab(index)}
      className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px
        ${isActive
          ? 'border-purple-600 text-purple-700'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
    >
      {children}
    </button>
  )
}

// ─── Panel content ────────────────────────────────────────────────
function TabPanel({ children, index }) {
  const { activeTab } = useTabsContext()

  // Only render active panel — others are null
  if (activeTab !== index) return null

  return (
    <div className="animate-in fade-in duration-200">
      {children}
    </div>
  )
}

// ─── Attach sub-components to parent — compound component API ─────
Tabs.List = TabList
Tabs.Tab = Tab
Tabs.Panel = TabPanel

export default Tabs