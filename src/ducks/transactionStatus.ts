//Actions
const SET_TRANSACTION_STATUS = 'nordle/transaction/SET_TRANSACTION_STATUS'; 

const initialState = {
  transactionStatus: false
};

//Reducers
export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_TRANSACTION_STATUS: return {
      ...state, transactionStatus: state.transactionStatus, 
    }
    default: return state;
  }
};

//Action creators
export const setTransactionStatus = () => ({ type: SET_TRANSACTION_STATUS});