import { FC, useCallback } from "react";
import { Input } from "./Input";
import { useDebouncedCallback } from "use-debounce";

type Props = {
    className?: string;
    onSearch: (keyword?: string) => Promise<void>;
}

export const Search: FC<Props> = props => {
    const onSearch = useCallback(async (keyword?: string) => {
        await props.onSearch(keyword);
    }, [props.onSearch]);

    const debounced = useDebouncedCallback(onSearch, 1000);

    return (
        <div className={`flex flex-row gap-4 ${props.className} items-center`}>
            <Input placeholder="Позиция..." onChange={e => debounced(e.target.value)}/>
        </div>
    );
}