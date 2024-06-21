import { ForwardedRef, InputHTMLAttributes, RefAttributes, forwardRef } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & RefAttributes<HTMLInputElement>;

export const Input = forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    return <input
        ref={ref}
        className="border border-slate-300 w-full h-10 py-2 px-3 placeholder:text-opacity-85 focus:outline-none" 
        {...props}
    />
})