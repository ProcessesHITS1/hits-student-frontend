import { FC, useMemo } from "react";
import { PageInfoDto } from "../../../api/clients/auth";
import { PaginationItem } from "./PaginationItem";
import { ThreeDot } from "./ThreeDot";

const PAGE_REDUCTION_THRESHOLD = 3;

type Props = {
    info: PageInfoDto;
}

export const Pagination: FC<Props> = props => {
    const pageInfo = props.info;
    const currentPage = pageInfo.pageNumber!;
    const totalPages = pageInfo.total!;

    const isInBeginning = currentPage <= PAGE_REDUCTION_THRESHOLD;
    const isInEnd = currentPage >= totalPages - PAGE_REDUCTION_THRESHOLD + 1

    const onItemPress = (page: number) => {
        return Promise.resolve(console.log(page));   
    }

    const shownMiddlePages = useMemo(() => {
        if (currentPage === 1) return [currentPage, currentPage + 1, currentPage + 2];
        else if (currentPage === totalPages) return [currentPage - 2, currentPage - 1, currentPage];
        
        return [currentPage - 1, currentPage, currentPage + 1]
    }, [currentPage, totalPages]);

    return (
        <div className="flex flex-row gap-2">
            <PaginationItem
                key="previous"
                text={"<"}
                onPress={() => onItemPress(pageInfo.pageNumber!)} 
                isDisabled={pageInfo.pageNumber! === 1}
            />
            {
                currentPage >= PAGE_REDUCTION_THRESHOLD &&
                    <PaginationItem
                        key={1}
                        text="1"
                        onPress={() => onItemPress(1)}
                    />
            }
            {!isInBeginning && <ThreeDot /> }
            {shownMiddlePages.map(page => 
                <PaginationItem 
                    key={page}
                    text={page} 
                    onPress={() => onItemPress(page)}
                    isSelected={pageInfo.pageNumber === page}
                />
            )}
            {!isInEnd && <ThreeDot /> }
            {
                currentPage <= totalPages - PAGE_REDUCTION_THRESHOLD + 1
                && <PaginationItem
                        key={totalPages}
                        text={totalPages}
                        onPress={() => onItemPress(totalPages)}
                    />
            }
            <PaginationItem
                key="next"
                text={">"}
                onPress={() => onItemPress(pageInfo.pageNumber!)}
                isDisabled={pageInfo.pageNumber! === pageInfo.total!} 
            />
        </div>
    );
}