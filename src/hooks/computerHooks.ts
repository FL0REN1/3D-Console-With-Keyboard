import { typeDispatch, typeRoot } from "../store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useComputerDispatch = () => useDispatch<typeDispatch>();
export const useComputerSelector: TypedUseSelectorHook<typeRoot> = useSelector;