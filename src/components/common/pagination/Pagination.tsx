import { FC, useMemo } from "react";
import { PaginationItem } from "./PaginationItem";
import { ThreeDot } from "./ThreeDot";

const PAGE_REDUCTION_THRESHOLD = 3;

type Props = {
    currentPage: number;
    totalPages: number;
}

export const Pagination: FC<Props> = props => {
    const { currentPage, totalPages } = props;

    const isInBeginning = currentPage <= PAGE_REDUCTION_THRESHOLD;
    const isInEnd = currentPage >= totalPages - PAGE_REDUCTION_THRESHOLD + 1

    const onItemPress = (page: number) => {
        return Promise.resolve(console.log(page));   
    }

    const shownMiddlePages = useMemo(() => {
        if (currentPage === 1) {
            const lengthToShow = Math.min(PAGE_REDUCTION_THRESHOLD, totalPages);
            return [...Array(lengthToShow)].map((_, i) => i + 1);
        }
        
        else if (currentPage === totalPages) return [currentPage - 2, currentPage - 1, currentPage];
        
        return [currentPage - 1, currentPage, currentPage + 1]
    }, [currentPage, totalPages]);

    return (
        <div className="flex flex-row gap-2">
            <PaginationItem
                key="previous"
                text={"<"}
                onPress={() => onItemPress(currentPage)} 
                isDisabled={currentPage === 1}
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
                    isSelected={currentPage === page}
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
                onPress={() => onItemPress(currentPage)}
                isDisabled={currentPage === currentPage} 
            />
        </div>
    );
}