import React from "react";

type RelayCardProps = {
  name: string;
  topic: string;
};

const RelayCard = ({ name, topic }: RelayCardProps) => (
  <div className="flex border-2 border-[#8B6B67] rounded-2xl p-5 mb-6 bg-white items-start gap-4">
    <div className="w-28 h-28 bg-[#E5DEDD] rounded-xl flex-shrink-0" />
    <div className="flex-1 relative">
      <div className="absolute top-0 right-0 w-12 h-12 bg-[#E5DEDD] rounded-full border border-[#8B6B67]" />
      <div className="mt-2 ml-0">
        <div className="text-[28px] font-medium text-[#8B6B67]">{name}</div>
        <div className="text-[20px] text-[#8B6B67] mt-1">{topic}</div>
      </div>
    </div>
  </div>
);

export default RelayCard; 