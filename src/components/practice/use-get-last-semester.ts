import { useContext, useEffect, useState } from "react";
import { SemesterContext } from "./SemesterContextProvider";
import { SemesterDto } from "../../api/clients/internship";

export const useGetLastSemester = () => {
    const [semester, setSemester] = useState<SemesterDto | undefined>();
    const semesters = useContext(SemesterContext);

    useEffect(() => {
        const lastSemester = semesters.sort((a, b) => {
            if (!a.semester || !b.semester) return 0;
    
            if (a.semester > b.semester) return 1;
    
            return -1;
        })[0];

        setSemester(lastSemester);
    }, [semesters])

    return semester;
}