import { Button } from "./Button";
import { Input } from "./Input";
import searchIcon from "../../assets/search-icon.svg";

export const Search = () => {
    return (
        <div className="flex flex-row">
            <Input />
            <Button className="px-4 py-3 bg-blue-500">
                <img src={searchIcon} width={16} height={16}/>
            </Button>
        </div>
    );
}