import { Card } from "../common/Card"
import { Contact } from "../common/Contact";
import { H5 } from "../common/Headers";
import { CommonText } from "../common/CommonText";

export const PositionDescriptionCard = () => {
    return (
        <Card 
            header={PositionDesciptionCardHeader} 
            body={PositionDesciptionCardBody}
            isExpandable={true}
        />
    )
}

const PositionDesciptionCardHeader = (isExpanded: boolean) => {
    return (
        <div className="flex flex-col gap-3 items-center">
            <H5 text="О вакансии" color="text-black"/>
            {isExpanded && <CommonText text={"Описание вакансии бла бла бла мучо тексто"} className="text-black text-center"/>}
        </div>
    );
}

const PositionDesciptionCardBody = () => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-1 items-start w-full">
                <H5 text={"Контакты"} color="text-black"/>
                <Contact name={"Сус Амогус Бакович"} phone="+79095483131"/>
            </div>
            <div className="flex flex-col gap-1 items-start w-full">
                <H5 text={"Куратор"} color="text-black"/>
                <Contact name={"Сус Амогус Бакович второй"} phone="911-911"/>
            </div>
        </div>
    );
}