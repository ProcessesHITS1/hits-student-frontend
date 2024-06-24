import { Menu } from "../common/Menu/Menu.tsx";
import { PageWithHeader } from "../common/PageWithHeader.tsx";
import { Offers } from "./offers/Offers.tsx";
import { authApi } from "../../infrastructure/api-clients.ts";
import { useQuery } from "../../infrastructure/use-query.ts";

export const Profile = () => {
    const { data } = useQuery(
        () => authApi.getAuthenticatedUserInfo()
    );

    const fullName = data ? `${data?.firstName} ${data?.lastName}` : undefined;

    return (
        <PageWithHeader 
            headerText={fullName} 
            textBelowHeader={data?.group?.number}
        >
            <div className="flex h-full w-full">
                <Menu
                    tabs={[
                        {
                            name: "Офферы",
                            component: <Offers />
                        }
                    ]} 
                />
            </div>
        </PageWithHeader>
    );
}