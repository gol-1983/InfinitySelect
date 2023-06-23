import {
    configureStore,
    ThunkAction,
    AnyAction,
    combineReducers,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer, Persistor } from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import { PersistPartial } from "redux-persist/es/persistReducer";

import { authReducer, IState } from "./slice";

interface PersistedSelectState extends PersistPartial, IState {
    tree: any;
}

const selectPersistConfig = {
    key: "tree",
    storage,
};

const persistedSelectReducer = persistReducer<PersistedSelectState, AnyAction>(
    selectPersistConfig,
    authReducer as unknown as (
        state: IState | undefined,
        action: AnyAction
    ) => PersistedSelectState
);

const rootReducer = combineReducers({
    tree: persistedSelectReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>;
export const persistor: Persistor = persistStore(store);

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
