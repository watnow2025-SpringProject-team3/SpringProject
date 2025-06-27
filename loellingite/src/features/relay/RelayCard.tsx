import React from "react";
import { Relay } from "@/types/relay";
interface RelayCardProps {
    relays: Relay[];
}

export default function RelayCard({ relays }: RelayCardProps) {
  return (
    <ul className="space-y-4">
      {relays.map((relay) => (
        <li key={relay.id} className="flex border-2 border-primaryBorder rounded-2xl p-5 mb-6 bg-primaryBackground items-start gap-4">
          <div className="w-28 h-28 bg-primaryLight rounded-xl flex-shrink-0" />
          <div className="flex-1 relative">
            <div className="absolute top-0 right-0 w-12 h-12 bg-primaryLight rounded-full border border-primaryBorder" />
            <div className="mt-2 ml-0">
              <div className="text-[28px] font-medium text-primaryText">{relay.name}</div>
              <div className="text-[20px] text-primaryText mt-1">{relay.description}</div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
