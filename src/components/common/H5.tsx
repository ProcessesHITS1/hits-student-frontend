import { FC } from "react";

type Props = {
    text: string;
}

export const H5: FC<Props> = props => {
    return <h5 className='text-3xl font-medium'>{props.text}</h5>
}