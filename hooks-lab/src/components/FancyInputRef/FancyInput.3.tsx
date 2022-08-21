import { forwardRef, InputHTMLAttributes } from "react";

// React.HTMLProps<HTMLInputElement> => InputHTMLAttributes<HTMLInputElement>
export interface FancyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

/**
 * 
 * @param props 
 * @param ref 
 * @returns 
 * Ref<FancyInputRef> => ForwardedRef<FancyInputRef>
 */
const FancyInput: React.ForwardRefRenderFunction<HTMLInputElement, FancyInputProps> = (
  { name, label, ...rest },
  ref
) => {
  return (
    <div className="input-block">
      <label htmlFor="name">{label}</label>
      <input type="text" name={name} ref={ref} {...rest} />
    </div>
  )
}

export const FrowardFancyInput = forwardRef<HTMLInputElement, FancyInputProps>(FancyInput);