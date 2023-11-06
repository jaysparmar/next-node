import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Import your slices
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
import pharmacy from 'src/store/apps/pharmacy'

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['pharmacy'] // Names of the slices you want to persist
  // Other configurations as needed
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    pharmacy
  })
)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)
