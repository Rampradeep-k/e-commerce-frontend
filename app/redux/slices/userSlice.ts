interface UserState {
  userInfo: [] 
  userSuccess: boolean,
  userError: string | boolean,
};

const UserState: UserState = {
  userInfo: [],
  userSuccess: false,
  userError: false,
};

const userReducer = (state = UserState, action: any) => {
  switch (action.type) {
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        userSuccess: true,
        userError: false,
        userInfo: action.payload,
      };
    case 'GET_USER_FAILURE':
      return {
        ...state,
        userSuccess: false,
        userError: true,
        userInfo: null,
      };
    case 'RESET_USER':
      return {
        ...state,
        userSuccess: false,
        userError: false,
        userInfo: [],
      };
    default:
      return state;
  }
};

export default userReducer;