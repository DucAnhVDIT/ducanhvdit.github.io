// reducers/authReducer.ts
import { Reducer } from 'redux';
import { LOGIN_SUCCESS, LOGOUT } from '../services/AuthContext';

// State type
interface AuthState {
  user: [] | null;
  isAuthenticated: boolean;
}

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

// Reducer
const authReducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;