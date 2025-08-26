import { produce } from "immer";

export const updateNestedState = (prevState, path, value) => {
    return produce(prevState, draft => {
        const keys = path.split(".");
        let temp = draft;

        keys.forEach((key, index) => {
            if (index === keys.length - 1) {
                temp[key] = value;
            } else {
                if (!temp[key]) temp[key] = {};
                temp = temp[key];
            }
        });
    });
};