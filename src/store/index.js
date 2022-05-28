import { applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'

const initialState = {
  data: {},
  error: false,
  loading: true,
  filter: {}
}

function reducer (state = initialState, action) {
  if (action.type === 'FETCH_DATA') {
    return {
      ...state,
      data: action.payload.data
    }
  }

  if (action.type === 'ERROR_DATA') {
    return {
      ...state,
      error: true
    }
  }

  if (action.type === 'LOADING_DATA') {
    return {
      ...state,
      loading: false
    }
  }

  if (action.type === 'FILTER_DATA') {
    return {
      ...state,
      loading: true,
      data: action.payload.data.data,
      filter: action.payload.filter
    }
  }

  return state
}

let middlewares = applyMiddleware(reduxThunk)

const store = configureStore({
  reducer,
  middlewares,
})

export default store