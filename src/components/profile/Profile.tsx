import { Menu } from "../common/Menu/Menu.tsx";
import { PageWithHeader } from "../common/PageWithHeader.tsx";
import { Offers } from "./offers/Offers.tsx";
import { Priorities } from "./priorities/Priorities.tsx";
import { authApi } from "../../infrastructure/api-clients.ts";
import { useFetchRequestData } from "../../infrastructure/use-fetch-request-data.ts";

export const Profile = () => {
    const data = useFetchRequestData(
        () => authApi.getAuthenticatedUserInfo()
    );

    const fullName = data.data ? `${data.data?.firstName} ${data.data?.lastName}` : undefined;

    return (
        <PageWithHeader 
            headerText={fullName} 
            textBelowHeader={data.data?.group.number}
        >
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