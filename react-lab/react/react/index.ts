import { Hook } from "../@types/react-dom";


let workInProgressHook: Hook | null = null;
let currentlyRenderingFiber: Fiber = (null: any);
