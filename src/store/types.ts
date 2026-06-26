import type store  from './store'

// RootState — the shape of the entire Redux store
// ReturnType<typeof store.getState> automatically infers this
// from your configureStore — no manual typing needed
export type RootState = ReturnType<typeof store.getState>

// AppDispatch — type of the dispatch function
// Knows about thunks, async actions etc.
export type AppDispatch = typeof store.dispatch