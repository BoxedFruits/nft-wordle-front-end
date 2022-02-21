// Actions
const UPDATE_ADDRESS = 'nordle/address/UPDATE_ADDRESS';

const initialState = {
  address: ''
};

export interface address {
  address: string;
}

// Reducers
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ADDRESS:
      console.log("HERE?", action,state)
      return { ...state, address: action.payload.address };
    default: return state;
  }
};

export const updateAddress = (newAddress) => ({ type: UPDATE_ADDRESS, payload: { address: newAddress } });