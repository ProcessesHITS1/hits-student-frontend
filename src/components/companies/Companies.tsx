import { useEffect, useState } from "react";
import { PageWithHeader } from "../common/PageWithHeader"
import { CompanyCard } from "./CompanyCard"
import { Pagination } from "../common/pagination/Pagination";
import { PositionDetails } from "../../api/clients/interview";
import { positionsApi, seasonsApi } from "../../infrastructure/api-clients";
import { useAsyncEffect } from "../../infrastructure/use-async-effect";

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
    }, [setPositions]);

    return (
        <PageWithHeader headerText="Компании">
            <div className="px-4 pt-5">
                {positions && <Pagination currentPage={1} totalPages={Math.floor(positions?.length / 6) + 1}/>}
                <div className="grid grid-rows-6 grid-cols-1 md:grid-rows-3 md:grid-cols-2 gap-4 mt-10">
                    {
                        positions
                        && positions.map(position => 
                            <CompanyCard
                                key={position.positionInfo?.id} 
                                company={position.companyInfo?.name!} 
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