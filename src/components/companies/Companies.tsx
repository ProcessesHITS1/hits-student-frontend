import { useCallback, useEffect, useState } from "react";
import { PageWithHeader } from "../common/PageWithHeader"
import { CompanyCard } from "./CompanyCard"
import { Pagination } from "../common/pagination/Pagination";
import { PositionDetails } from "../../api/clients/interview";
import { positionsApi, seasonsApi } from "../../infrastructure/api-clients";
import { useAsyncEffect } from "../../infrastructure/use-async-effect";
import { Search } from "../common/Search";
import { ClipLoader } from "react-spinners";

export const Companies = () => {
    const [positions, setPositions] = useState<PositionDetails[] | undefined>();
    const [isSearching, setIsSearching] = useState(false);

    const search = useCallback(
        async (keyword?: string) => {
            setIsSearching(true);
            const season = await seasonsApi.apiSeasonYearGet(2011);
    
            if (!season.data.companies) return;
        
            const positions = await positionsApi.apiPositionSearchGet(
                season.data.companies.map(x => x.id!),
                keyword
            );
        
            if (!positions.data) return;
            
            setIsSearching(false);
            setPositions(positions.data);
        }, [setPositions])

    useAsyncEffect(search, [search]);

    return (
        <PageWithHeader headerText="Компании">
            <div className="flex flex-col px-4 pt-5 h-full" >
                <div className="flex flex-col-reverse sm:flex-row w-full items-center h-fit sm:justify-between">
                    {positions && <Pagination currentPage={1} totalPages={Math.floor(positions?.length / 6) + 1}/>}
                    <Search onSearch={search}/>
                </div>
                {isSearching ?
                    <div className="flex w-full h-full justify-center items-center">
                        <ClipLoader loading={isSearching} /> 
                    </div>
                    : <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10 w-full">
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
                }
            </div>
            
        </PageWithHeader>
    )
}