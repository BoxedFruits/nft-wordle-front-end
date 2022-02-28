//Did not test if this works yet. Have to wait until can interact with contract

//Actions
const SET_TRANSACTION_STATUS = 'nordle/transaction/SET_TRANSACTION_STATUS';

const initialState = {
  transactionStatus: false
};

//Reducers
export const reducer = (state = initialState, action) => {
  console.log("tx reducer:", action)
  switch (action.type) {
    case SET_TRANSACTION_STATUS: return {
      ...state, transactionStatus: action.payload.transactionStatus,
    }
    default: return state;
  }
};

//Action creators
export const setTransactionStatus = (transactionStatus) => ({ type: SET_TRANSACTION_STATUS, payload: { transactionStatus } });