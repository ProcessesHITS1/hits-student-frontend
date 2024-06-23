import { useContext, useEffect } from "react";
import { Offer } from "./Offer";
import { SeasonContext } from "../../SeasonContextProvider";
import { useQuery } from "../../../infrastructure/use-query";
import { requestApi } from "../../../infrastructure/api-clients";

export const Offers = () => {
    const { season } = useContext(SeasonContext);
    const { data: requests, refetch } = useQuery(
        params => requestApi.apiRequestMyGet([params.year]),
        { year: 2020 },
        false
    );

    useEffect(() => {
        if (!season?.year) return;
        refetch({ year: season.year });
    }, [season])

    return (
        <div className="w-full flex flex-col items-center pt-6 px-8 md:px-20 xl:px-28 2xl:px-40">
            {
                requests?.items &&
                requests.items
                    .filter(x => x.requestResult != null)
                    .map(x => 
                        <Offer
                            key={x.id}
                            companyId={x.companyId} 
                            positionTitle={x.positionTitle!} 
                            resultStatus={x.requestResult!.resultStatus!}                        
                        />
                    )
            }
        </div>
    );
}