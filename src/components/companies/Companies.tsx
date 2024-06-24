import { useCallback, useContext, useEffect, useState } from "react";
import { PageWithHeader } from "../common/PageWithHeader"
import { CompanyCard } from "./CompanyCard"
import { Pagination } from "../common/pagination/Pagination";
import { PositionInfoPaginatedItems } from "../../api/clients/interview";
import { positionsApi } from "../../infrastructure/api-clients";
import { Search } from "../common/Search";
import { ClipLoader } from "react-spinners";
import { CommonText } from "../common/CommonText";
import { useQuery } from "../../infrastructure/use-query";
import { SeasonContext } from "../SeasonContextProvider";
import { RequestModal } from "./RequestModal";

type QueryParams = {
    keyword?: string;
    page?: number;
    year: number;
}

export const Companies = () => {
    const [isRequestModalShown, setIsRequestModalShown] = useState(false);
    const [selectedPositionId, setSelectedPositionId] = useState<string | undefined>();
    const [searchKeyword, setSearchKeyword] = useState<string | undefined>(undefined);
    const { season } = useContext(SeasonContext);
    console.log(`season ${season}`);

    const { isLoading, data: positions, refetch } = useQuery<QueryParams, PositionInfoPaginatedItems>(
        params => positionsApi.apiPositionSearchGet(
            params?.year, [], params?.keyword, params?.page
        )
    );

    const search = useCallback(
        async (keyword?: string, page?: number) => {
            if (!season?.year) return;
            await refetch({ keyword: keyword, page: page, year: season.year})
        }, 
        [refetch, season]
    );

    useEffect(() => {
        if (!season?.year) return;
        refetch({ year: season.year });
    }, [season]);

    return (
        <PageWithHeader headerText="Компании">
            <div className="flex flex-col px-4 pt-5 h-full" >
                <div className="flex flex-col-reverse gap-4 sm:flex-row w-full items-center h-fit sm:justify-between">
                    {positions?.paginationInfo && <Pagination 
                        currentPage={positions.paginationInfo.currentPage!} 
                        totalPages={positions.paginationInfo.totalItems!}
                        onPagePress={page => search(searchKeyword, page)}
                    />}
                    <div className="flex flex-grow"></div>
                    <Search onSearch={async keyword =>{
                        setSearchKeyword(keyword);
                        await search(keyword);
                    }}/>
                </div>
                {isLoading ?
                    <div className="flex w-full h-full justify-center items-center">
                        <ClipLoader loading={isLoading} /> 
                    </div> : 
                    positions?.items?.length ? 
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10 w-full">
                        {
                            positions
                            && positions.items!.map(position => 
                                <CompanyCard
                                    key={position.id} 
                                    positionId={position.id!}
                                    companyName={position.companyName!} 
                                    position={position.title!} 
                                    numberOfPositions={position.nSeats!} 
                                    contact={"name nameovich"} 
                                    tutor={"name nameovich"}
                                    onPress={() => {
                                        setIsRequestModalShown(true);
                                        setSelectedPositionId(position.id);
                                    }}                                
                                />
                            )
                        }
                    </div> :
                    <div className="flex w-full h-full justify-center items-center">
                        <CommonText text={"нитиво не нашлось :("} /> 
                    </div>
                }
            </div>
            <RequestModal 
                isOpen={isRequestModalShown} 
                positionId={selectedPositionId ?? ''} 
                onRequestClose={() => setIsRequestModalShown(false)}
            />
        </PageWithHeader>
    )
}