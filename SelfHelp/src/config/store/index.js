import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {rootReducer} from '../../redux';
import rootSaga from '../../sagas';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export default function configureStore() {
  const store = createStore(
    persistedReducer,
    applyMiddleware(thunk, ...middleware),
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return {store, persistor};
}
