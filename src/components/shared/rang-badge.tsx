import { Trophy } from "lucide-react";

export default function RankBadge({ index }: { index: number }) {
    const isFirst = index === 0;
    const isSecond = index === 1;
    const isThird = index === 2;

    const bgColor = isFirst ? "bg-[#BA7517]"
        : isSecond ? "bg-[#888780]"
            : isThird ? "bg-[#993C1D]"
                : "bg-background border border-border";

    const textColor = isFirst ? "text-[#FAEEDA]"
        : isSecond ? "text-[#F1EFE8]"
            : isThird ? "text-[#FAECE7]"
                : "text-foreground";

    return (
        <div className={`
            absolute top-5 left-5 z-20
            h-9 w-9 rounded-full
            flex flex-col items-center justify-center
            border border-white/20
            -rotate-12 group-hover/card:rotate-0
            transition-transform duration-300 select-none
            ${bgColor}
            `}>
            {isFirst ? (
                <Trophy className={`h-4 w-4 ${textColor}`} />
            ) : (
                <div className="flex flex-col items-center justify-center leading-none">
                    <span className={`text-[7px] font-medium tracking-wide uppercase ${textColor}`}>top</span>
                    <span className={`text-[13px] font-medium ${textColor}`}>#{index + 1}</span>
                </div>
            )}
        </div>
    );
};