import { combineReducers } from 'redux';
import { reducer as addressReducer } from '../src/ducks/address';
import { reducer as transactionStatusReducers } from '../src/ducks/transactionStatus';

const rootReducer = combineReducers({ addressReducer, transactionStatusReducers });
export default rootReducer;