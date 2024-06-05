import { Menu } from "../common/Menu/Menu.tsx";
import { PageWithHeader } from "../common/PageWithHeader.tsx";
import { Offers } from "./offers/Offers.tsx";
import { Priorities } from "./priorities/Priorities.tsx";

export const Profile = () => {
    return (
        <PageWithHeader headerText="hello is this imposter from among us" headerChildren={<span>sussy baka</span>}>
            <div className="flex h-full w-full">
                <Menu
                    tabs={[
                        {
                            name: "Офферы",
                            component: <Offers />
                        },
                        {
                            name: "Приоритеты",
                            component: <Priorities />
                        }
                    ]} 
                />
            </div>
        </PageWithHeader>
    );
}