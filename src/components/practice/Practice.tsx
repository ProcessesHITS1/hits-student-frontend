import { PageWithHeader } from "../common/PageWithHeader"
import { PracticeContainer } from "./PracticeContainer"
import { SemesterContextProvider } from "./SemesterContextProvider"

export const Practice = () => {
    return (
        <PageWithHeader
            headerText="Практика"
        >
            <SemesterContextProvider>
                <PracticeContainer />
            </SemesterContextProvider>
        </PageWithHeader>
    )
}