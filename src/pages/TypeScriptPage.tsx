import { useState } from 'react'
import type { Task, Status, Priority } from '../types'

// ─── Demonstrating all key TS concepts in one place ─────────────

// 1. Interface
interface DemoTask {
  id: number
  title: string
  status: Status
  priority: Priority
  tags?: string[]   // optional array
}
//interface defines the shape of the object.

// 2. Type
type ButtonVariant = 'primary' | 'secondary' | 'danger' 

// 3. Generic function
function getFirstItem<T>(arr: T[]): T | undefined {
  return arr[0]
}   

// 4. Enum (alternative to union types)
enum AppraisalStatus {
  PENDING = 'pending',
  SUBMITTED = 'submitted',
  APPROVED = 'approved',
}

// 5. Utility types
type PartialTask = Partial<Task>         // all fields optional
type ReadonlyTask = Readonly<Task>       // all fields readonly
type TaskPreview = Pick<Task, 'id' | 'title' | 'status'>  // only these fields
type TaskWithoutId = Omit<Task, 'id'>    // everything except id

function TypeScriptPage() {
  const [activeDemo, setActiveDemo] = useState<string>('types')

  const demoTask: DemoTask = {
    id: 1,
    title: 'Learn TypeScript',
    status: 'in-progress',
    priority: 'high',
    tags: ['react', 'typescript'],
  }

  const demos = [
    {
      id: 'types',
      label: 'Types & Interfaces',
      content: (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            TypeScript adds static types to JavaScript. Types are checked at
            compile time — bugs caught before runtime.
          </p>
          <div className="bg-gray-900 rounded-xl p-4 text-sm font-mono">
            <p className="text-green-400">{'// Interface — shape of an object'}</p>
            <p className="text-blue-300">{'interface Task {'}</p>
            <p className="text-white pl-4">{'id: number'}</p>
            <p className="text-white pl-4">{'title: string'}</p>
            <p className="text-white pl-4">{"status: 'todo' | 'in-progress' | 'done'"}</p>
            <p className="text-blue-300">{'}'}</p>
            <br />
            <p className="text-green-400">{'// Union type — only these values allowed'}</p>
            <p className="text-blue-300">{"type Status = 'todo' | 'in-progress' | 'done'"}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700 font-medium">Demo task object:</p>
            <pre className="text-xs text-blue-600 mt-1">
              {JSON.stringify(demoTask, null, 2)}
            </pre>
          </div>
        </div>
      )
    },
    {
      id: 'generics',
      label: 'Generics',
      content: (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Generics make functions and interfaces work with multiple types
            while keeping type safety.
          </p>
          <div className="bg-gray-900 rounded-xl p-4 text-sm font-mono">
            <p className="text-green-400">{'// Works with any type'}</p>
            <p className="text-blue-300">{'function getFirst<T>(arr: T[]): T | undefined {'}</p>
            <p className="text-white pl-4">{'return arr[0]'}</p>
            <p className="text-blue-300">{'}'}</p>
            <br />
            <p className="text-green-400">{'// TypeScript infers the return type'}</p>
            <p className="text-purple-300">{'const first = getFirst<string>(["a","b","c"])'}</p>
            <p className="text-gray-400">{'// first: string | undefined'}</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="text-xs text-purple-700">
              Result: {JSON.stringify(getFirstItem(['React', 'TypeScript', 'Redux']))}
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'utility',
      label: 'Utility Types',
      content: (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Built-in TypeScript types that transform existing types.
          </p>
          <div className="bg-gray-900 rounded-xl p-4 text-sm font-mono space-y-2">
            <p><span className="text-yellow-400">Partial</span><span className="text-white">{'<Task>'}</span><span className="text-gray-400"> — all fields optional</span></p>
            <p><span className="text-yellow-400">Readonly</span><span className="text-white">{'<Task>'}</span><span className="text-gray-400"> — no mutations allowed</span></p>
            <p><span className="text-yellow-400">Pick</span><span className="text-white">{"<Task, 'id'|'title'>"}</span><span className="text-gray-400"> — only these fields</span></p>
            <p><span className="text-yellow-400">Omit</span><span className="text-white">{"<Task, 'id'>"}</span><span className="text-gray-400"> — everything except id</span></p>
            <p><span className="text-yellow-400">Record</span><span className="text-white">{"<Status, string>"}</span><span className="text-gray-400"> — object with Status keys</span></p>
          </div>
        </div>
      )
    },
    {
      id: 'events',
      label: 'Typing Events',
      content: (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            React event types — TypeScript knows exactly what each event has.
          </p>
          <div className="bg-gray-900 rounded-xl p-4 text-sm font-mono space-y-1">
            <p className="text-gray-400">{'// Input'}</p>
            <p className="text-white">{'React.ChangeEvent<HTMLInputElement>'}</p>
            <p className="text-gray-400 mt-2">{'// Select'}</p>
            <p className="text-white">{'React.ChangeEvent<HTMLSelectElement>'}</p>
            <p className="text-gray-400 mt-2">{'// Button click'}</p>
            <p className="text-white">{'React.MouseEvent<HTMLButtonElement>'}</p>
            <p className="text-gray-400 mt-2">{'// Form submit'}</p>
            <p className="text-white">{'React.FormEvent<HTMLFormElement>'}</p>
          </div>
        </div>
      )
    }
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">TypeScript</h1>
      <p className="text-sm text-gray-500 mb-6">
        Static typing for JavaScript — catch bugs at compile time
      </p>

      <div className="flex gap-2 mb-6 flex-wrap">
        {demos.map(demo => (
          <button
            key={demo.id}
            onClick={() => setActiveDemo(demo.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors
              ${activeDemo === demo.id
                ? 'bg-blue-700 text-white border-blue-700'
                : 'bg-white text-gray-600 border-gray-200'}`}
          >
            {demo.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        {demos.find(d => d.id === activeDemo)?.content}
      </div>
    </div>
  )
}

export default TypeScriptPage