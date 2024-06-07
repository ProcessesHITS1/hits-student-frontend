import { FC, InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<Props> = props => {
    return <input 
        className="border border-slate-300 w-full h-10 py-2 px-3 placeholder:text-opacity-85" 
        {...props}
    />
}