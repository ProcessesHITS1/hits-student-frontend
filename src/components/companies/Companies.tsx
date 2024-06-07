import { useState } from "react";
import { PageWithHeader } from "../common/PageWithHeader"
import { CompanyCard } from "./CompanyCard"
import { Pagination } from "../common/pagination/Pagination";

export const Companies = () => {
    const [companies, setCompanies] = useState([
        {
            company: "MCC Tomsk",
            position: "Fullstack-developer",
            numberOfPositions: 3,
            contact: "I.A. Volgin",
            tutor: "S.A. Volgina",
        },
        {
            company: "MCC Tomsk 2",
            position: "Fullstack-developer",
            numberOfPositions: 2,
            contact: "I.A. Volgin",
            tutor: "S.A. Volgina",
        },
        {
            company: "MCC Tomsk 3",
            position: "Fullstack-developer",
            numberOfPositions: 1,
            contact: "I.A. Volgin",
            tutor: "S.A. Volgina",
        },
    ]);

    return (
        <PageWithHeader headerText="Компании">
            <div className="px-4 pt-5">
                <Pagination info={{
                    pageNumber: 4,
                    total: 10
                }}/>
                <div className="grid grid-rows-6 grid-cols-1 md:grid-rows-3 md:grid-cols-2 gap-4 mt-10">
                    {companies.map(company => <CompanyCard {...company} key={company.company}/>)}
                </div>
            </div>
        </PageWithHeader>
    )
}