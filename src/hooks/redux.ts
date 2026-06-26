import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store/types'

// Use these instead of plain useSelector/useDispatch
// They're pre-typed — no need to type RootState every time

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector(selector)

// Usage in components:
// const dispatch = useAppDispatch()         → typed dispatch
// const tasks = useAppSelector(selectAllTasks) → typed return value