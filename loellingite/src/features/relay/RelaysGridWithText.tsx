import Link from "next/link";

import { Relay } from "@/types/relay";

interface RelaysGridProps {
  relays: Relay[];
  className?: string;
}

export default function RelaysGridWithText({
  relays,
  className,
}: RelaysGridProps) {
  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <ul className="space-y-4">
        {relays.map((relay) => (
          <li
            key={relay.id}
            className="flex border-2 border-[#7B5858] rounded-2xl p-5 mb-6 bg-primaryBackground items-start gap-4"
          >
            <Link href={`/rooms/${relay.id}`} passHref>
              <div className="p-2 flex items-center space-x-4">
                <div className="w-14 h-14 rounded-full bg-primaryLight flex-shrink-0 border-primaryBorder border-[0.5px]"></div>
                <div className="flex-grow">
                  <h2 className="text-lg font-medium text-primaryText">
                    {relay.name || "No Name"}
                  </h2>
                  <p className="text-sm text-primaryText">
                    {relay.description || "No Description"}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
