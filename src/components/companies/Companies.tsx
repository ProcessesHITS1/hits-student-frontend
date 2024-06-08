import { useEffect, useState } from "react";
import { PageWithHeader } from "../common/PageWithHeader"
import { CompanyCard } from "./CompanyCard"
import { Pagination } from "../common/pagination/Pagination";
import { PositionDetails } from "../../api/clients/interview";
import { positionsApi, seasonsApi } from "../../infrastructure/api-clients";
import { useAsyncEffect } from "../../infrastructure/use-async-effect";
import { Search } from "../common/Search";

export const Companies = () => {
    const [positions, setPositions] = useState<PositionDetails[] | undefined>();

    useAsyncEffect(async () => {
        const season = await seasonsApi.apiSeasonYearGet(2011);
    
        if (!season.data.companies) return;
    
        const positions = await positionsApi.apiPositionSearchGet(
            season.data.companies.map(x => x.id!)  
        );
    
        if (!positions.data) return;
    
        setPositions(positions.data);
    }, []);

    return (
        <PageWithHeader headerText="Компании">
            <div className="flex flex-wrap px-4 pt-5">
                <div className="flex gap-4 flex-col-reverse sm:flex-row w-full items-center sm:justify-between">
                    {positions && <Pagination currentPage={1} totalPages={Math.floor(positions?.length / 6) + 1}/>}
                    <Search />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10 w-full h-full">
                    {
                        positions
                        && positions.map(position => 
                            <CompanyCard
                                key={position.positionInfo?.id} 
                                positionId={position.positionInfo?.id!}
                                companyName={position.companyInfo?.name!} 
                                position={position.positionInfo?.title!} 
                                numberOfPositions={position.positionInfo?.nPositions!} 
                                contact={"name nameovich"} 
                                tutor={"name nameovich"}                                
                            />
                        )
                    }
                </div>
            </div>
        </PageWithHeader>
    )
}