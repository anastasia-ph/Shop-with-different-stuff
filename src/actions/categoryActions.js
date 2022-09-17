import { CHANGE_CATEGORY } from "./actions";

export const changeCategoryValue = () => (dispatch) => {
    dispatch({
        type: CHANGE_CATEGORY
    }

    )
    console.log("ok")
};