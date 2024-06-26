import { useContext } from "react";
import { SemesterContext } from "./SemesterContextProvider";

export const useGetLastSemester = () => {
    const semesters = useContext(SemesterContext);

    return semesters.sort((a, b) => {
        if (!a.semester || !b.semester) return 0;

        if (a.semester > b.semester) return 1;

        return -1;
    })[0] ?? {};
}