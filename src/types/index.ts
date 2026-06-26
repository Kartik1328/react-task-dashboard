// ─── Basic types ────────────────────────────────────────────────

// Primitive types — same as JS but explicit
let taskTitle: string = "Fix bug"
let taskId: number = 1
let isComplete: boolean = false
let nothing: null = null
let notYet: undefined = undefined

// ─── Interface — shape of an object ────────────────────────────
// Use interface for objects you'll use as props or data models

export interface Task {
  id: number
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'  // union type — only these 3 values allowed
  priority: 'low' | 'medium' | 'high'       // union type
  createdAt?: Date   // ? means optional — may or may not exist
}

// ─── Type alias — alternative to interface ──────────────────────
// Use type for unions, primitives, computed types

export type Status = 'todo' | 'in-progress' | 'done'
export type Priority = 'low' | 'medium' | 'high'
export type Filter = 'all' | Status

// ─── Interface for Redux state ──────────────────────────────────
export interface TaskState {
  items: Task[]
  activeFilter: Filter
  searchQuery: string
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null   // either a string OR null
}

// ─── Props interfaces — what components accept ──────────────────
export interface TaskCardProps {
  task: Task
}

export interface TaskFormProps {
  hideForm?: boolean   // optional prop
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void           // function that returns nothing
  title: string
  children: React.ReactNode     // any valid JSX
}

export interface TooltipProps {
  text: string
  children: React.ReactNode
}

// ─── API response types ─────────────────────────────────────────
export interface APITask {
  id: number
  title: string
  completed: boolean
  userId: number
}

// ─── Auth types ─────────────────────────────────────────────────
export interface User {
  username: string
  role: string
}

export interface AuthContextType {
  user: User | null            // user OR null
  login: (username: string, password: string) => boolean
  logout: () => void
}