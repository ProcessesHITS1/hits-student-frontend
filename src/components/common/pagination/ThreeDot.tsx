export const ThreeDot = () => {
    return (
        <div className="flex flex-row gap-1 items-center">
            {[...Array(3)].map(_ => <Dot />)}
        </div>
    );
}

export const Dot = () => {
    return <div className="rounded-full w-1 h-1 bg-gray-300"></div>
}