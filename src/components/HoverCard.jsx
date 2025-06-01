const HoverCard = ({node, pos}) => {
    if (!node) return null;

    return (
        <div className="hover-card animate-float-in" style={{
            position: 'absolute',
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            transform: 'translateY(-50%)', // center vertically
        }}>
            <div className="pl-4 pr-2 bg-[#333333] rounded-[6px] border-l-[6px] text-base inline-flex font-light justify-start items-center font-space-grotesk"
                style={{ borderColor: node.color }}>
                <div className="py-2 flex justify-start items-center gap-8">
                    <div className="justify-start text-[#c9c9c9] ">{node.fullName}</div>
                    <div className="justify-start text-[#868686] ">{node.year}</div>
                </div>
                {/* <div className="w-[7.50px] h-[7.50px] bg-[#868686]" /> */}
                <div className="w-3 h-3" />
            </div>
        </div>
    );
}

export default HoverCard;