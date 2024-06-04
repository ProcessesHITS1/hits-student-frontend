import { H4 } from "./common/Headers";
import { PageWithHeader } from "./common/PageWithHeader";

export const Profile = () => {
    return (
        <PageWithHeader headerText="hello is this imposter from among us" headerChildren={<span>sussy baka</span>}>
            <div className="flex h-full w-full content-center justify-center items-center">
                <H4 text="...ummm what the sigma?" />
            </div>
        </PageWithHeader>
    );
}