import { Ref, forwardRef } from "react";

export interface FancyInputProps extends React.HTMLProps<HTMLInputElement> { }

/**
 * 
 * @param props 
 * @param ref 
 * @returns 
 * Ref<FancyInputRef> => ForwardedRef<FancyInputRef>
 */

export const FrowardFancyInput = forwardRef<HTMLInputElement, Ref<FancyInputProps>>(
  (props, ref) => {
    return <input ref={ref} {...props} />
  }
);