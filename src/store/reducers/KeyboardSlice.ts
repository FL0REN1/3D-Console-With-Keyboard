import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IkeyboardState {
    Keys: string;
    Key: string;
    ModesChoose: boolean;
}

const initialState: IkeyboardState = {
    Keys: '',
    Key: '',
    ModesChoose: false,
}

export const KeyboardSlice = createSlice({
    name: 'keyboard',
    initialState,
    reducers: {
        addKeys: (state, action: PayloadAction<string>) => {
            state.Keys += action.payload;
        },
        addKey: (state, action: PayloadAction<string>) => {
            state.Key = action.payload;
        },
        clearKeys: (state) => {
            state.Keys = '';
        },
        changeMode: (state, action: PayloadAction<boolean>) => {
            state.ModesChoose = action.payload;
        }
    }
})

export const { addKeys, clearKeys, addKey, changeMode } = KeyboardSlice.actions;
export default KeyboardSlice.reducer;