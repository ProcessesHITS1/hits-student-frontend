import { useCallback, useState } from "react";
import { PageWithHeader } from "../common/PageWithHeader"
import { CompanyCard } from "./CompanyCard"
import { Pagination } from "../common/pagination/Pagination";
import { PositionInfoPaginatedItems } from "../../api/clients/interview";
import { positionsApi } from "../../infrastructure/api-clients";
import { useAsyncEffect } from "../../infrastructure/use-async-effect";
import { Search } from "../common/Search";
import { ClipLoader } from "react-spinners";
import { CommonText } from "../common/Text";

export const Companies = () => {
    const [positions, setPositions] = useState<PositionInfoPaginatedItems | undefined>();
    const [searchKeyword, setSearchKeyword] = useState<string | undefined>();
    const [isSearching, setIsSearching] = useState(false);

    const search = useCallback(
        async (keyword?: string, page?: number) => {
            setIsSearching(true);
        
            const positions = await positionsApi.apiPositionSearchGet(
                2011,
                [],
                keyword,
                page
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
                    {positions && <Pagination 
                        currentPage={positions.paginationInfo?.currentPage!} 
                        totalPages={positions.paginationInfo?.totalPages!}
                        onPagePress={page => search(searchKeyword, page)}
                    />}
                    <div className="flex flex-grow"></div>
                    <Search onSearch={async keyword =>{
                        setSearchKeyword(keyword);
                        await search(keyword);
                    }}/>
                </div>
                {isSearching ?
                    <div className="flex w-full h-full justify-center items-center">
                        <ClipLoader loading={isSearching} /> 
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
                                />
                            )
                        }
                    </div> :
                    <div className="flex w-full h-full justify-center items-center">
                        <CommonText text={"нитиво не нашлось :("} /> 
                    </div>
                }
            </div>
            
        </PageWithHeader>
    )
}