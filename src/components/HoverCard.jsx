const HoverCard = ({node, pos}) => {
    if (!node) return null;

    return (
        <div className="hover-card" style={{
            position: 'absolute',
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            transform: 'translateY(-50%)', // center vertically
        }}>
            <div className="pl-3 pr-[7px] bg-[#333333] rounded border-l-4 inline-flex justify-start items-center gap-[7px]"
                style={{ borderColor: node.color }}>
                <div className="py-1 flex justify-start items-center gap-[5px]">
                    <div className="w-[125px] justify-start text-[#c9c9c9] text-sm font-light font-['Space_Grotesk']">{node.fullName}</div>
                    <div className="justify-start text-[#868686] text-sm font-light font-['Space_Grotesk']">{node.year}</div>
                </div>
                {/* <div className="w-[7.50px] h-[7.50px] bg-[#868686]" /> */}
                <div className="w-3 h-3" />
            </div>
        </div>
    );
}

export default HoverCard;