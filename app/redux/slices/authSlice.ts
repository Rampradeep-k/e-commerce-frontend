interface AuthState {
  loginInfo: [] | [{ user_id: number; name: string; email: string; token: string }]
  loading: boolean
  error: string | null
  loginSuccess: boolean
  loginError: string | false // ✅ either error message string or false
}

const initialState: AuthState = {
  loginInfo: [],
  loading: false,
  error: null,
  loginSuccess: false,
  loginError: false, // initial value
}

// 2️⃣ Reducer
const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
        loginSuccess: false,
        loginError: false,
      }

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        loginSuccess: true,
        loginError: false, // ✅ always boolean | string
        loginInfo: action.payload,
      }

    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        loginSuccess: false,
        loginError: action?.payload?.response?.data.data || 'Login failed', // ✅ string
        loginInfo: [],
      }

    case 'LOGIN_RESET':
      return {
        ...state,
        loading: false,
        loginSuccess: false,
        loginError: false, // reset
        loginInfo: [],
        error: null,
      }

    case 'LOGOUT':
      return {
        ...state,
        loginInfo: [],
        loginSuccess: false,
        loginError: false, // ✅ always matches type
        error: null,
      }

    default:
      return state
  }
}



export default authReducer
