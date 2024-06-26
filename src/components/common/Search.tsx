import { FC, useCallback, useState } from "react";
import { Input } from "./Input";
import { useDebouncedCallback } from "use-debounce";

type Props = {
    className?: string;
    onSearch: (keyword?: string) => Promise<void>;
}

export const Search: FC<Props> = props => {
    const [value, setValue] = useState("");
    const onSearch = useCallback(async (keyword?: string) => {
        await props.onSearch(keyword);
    }, [props.onSearch]);

    const debounced = useDebouncedCallback(onSearch, 1000);

    return (
        <div className={`flex ${props.className} items-center`}>
            <form onSubmit={e => {
                e.preventDefault();
                onSearch(value);
            }}>
                <Input placeholder="Позиция..." onChange={e => {
                    setValue(e.target.value);
                    debounced(e.target.value);
                }}/>
            </form>
        </div>
    );
}