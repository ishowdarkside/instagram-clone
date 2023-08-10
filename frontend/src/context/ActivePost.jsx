/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const activePost = createContext();
const initialState = {
  isOpenModal: false,
  activePost: null,
  isOpenPostModal: false,
  isOpenFollowingModal: false,
  isOpenFollowersModal: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "setActivePost":
      return { ...state, isOpenModal: true, activePost: action.payload };
    case "reset":
      return initialState;
    case "openPostModal":
      return { ...state, isOpenPostModal: true };
    case "openFollowingModal":
      return { ...state, isOpenFollowingModal: true };
    case "openFollowersModal":
      return { ...state, isOpenFollowersModal: true };
    default:
      throw new Error("UNKOWN ACTION TYPE");
  }
}

export default function ActivePostContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <activePost.Provider value={{ state, dispatch }}>
      {children}
    </activePost.Provider>
  );
}

export function usePostContext() {
  const context = useContext(activePost);
  if (!context) throw new Error("You can't use context here");
  return context;
}
