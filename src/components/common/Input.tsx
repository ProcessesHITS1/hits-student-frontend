import React, { FC, HTMLInputTypeAttribute } from 'react'

type Props = {
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
}

export const Input: FC<Props> = props => {
    return <input className="border border-slate-300 w-full h-10 py-2 px-3 placeholder:text-opacity-85" type={props.type} placeholder={props.placeholder}/>
}