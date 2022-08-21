import { Ref, forwardRef } from "react";

export interface FancyInputProps extends React.HTMLProps<HTMLInputElement> { }

/**
 * 
 * @param props 
 * @param ref 
 * @returns 
 * Ref<FancyInputRef> => ForwardedRef<FancyInputRef>
 */
function FancyInput(props: FancyInputProps, ref: Ref<HTMLInputElement>) {
  return <input ref={ref} {...props} />
}

export const FrowardFancyInput = forwardRef<HTMLInputElement, FancyInputProps>(FancyInput);