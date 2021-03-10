import { auth } from "../firebase";
import { currentUser } from "../actions/authActions";

//check firebase auth state and set user
export const getUserFromFirebase = (dispatch) =>
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const idTokenResult = await user.getIdTokenResult();

      dispatch(currentUser(idTokenResult));
    }
  });
