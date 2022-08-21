import { Ref, useRef, useImperativeHandle, forwardRef } from "react";

export interface FancyInputRef {
  focus: () => void;
  log: () => void;
}

export interface FancyInputProps extends React.HTMLProps<HTMLInputElement> { }


/**
 * 
 * @param props 
 * @param ref 
 * @returns 
 * Ref<FancyInputRef> => ForwardedRef<FancyInputRef>
 */
function FancyInput(props: FancyInputProps, ref: Ref<FancyInputRef>) {

  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    log: () => console.info('input log...')
  }))

  return <input ref={inputRef} {...props} />
}

export const FrowardFancyInput = forwardRef<FancyInputRef, FancyInputProps>(FancyInput);