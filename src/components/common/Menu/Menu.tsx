import { FC, ReactElement, useState } from "react";
import { MenuTab } from "./MenuTab";

type TabProps = {
    name: string;
    component: ReactElement
}

type Props = {
    tabs: TabProps[];
}

export const Menu: FC<Props> = props => {
    const [currentTab, setCurrentTab] = useState<TabProps>(props.tabs[0]);

    return (
        <div className="h-full w-full flex flex-col gap-2">
            <div className="flex flex-row">
                {props.tabs.map(tab => 
                    <MenuTab 
                        name={tab.name} 
                        onPress={() => setCurrentTab(tab)} 
                        key={tab.name}
                        isSelected = {tab.name == currentTab.name}
                    />
                )}
            </div>
            <div className="flex h-full w-full">
                {currentTab.component}
            </div>
        </div>
    );
}