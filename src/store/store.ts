import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers/reducers';
import thunk from './middlewares/thunk';

const store = createStore(reducers, undefined, applyMiddleware(thunk));
export type RootState = ReturnType<typeof store.getState>;

export default store;
