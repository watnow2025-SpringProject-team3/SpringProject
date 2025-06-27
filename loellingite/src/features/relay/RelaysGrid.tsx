import { Relay } from "@/types/relay";

interface RelaysGridProps {
  relays: Relay[];
}

export default function RelaysGrid({ relays }: RelaysGridProps) {
  return (
    <div className="grid grid-cols-2 gap-5 w-[90%] max-w-[420px] mx-auto">
      {relays.map((relay) => (
        <div
          key={relay.id}
          className="bg-primaryLight border border-primaryBorder rounded-2xl min-h-[160px] min-w-[140px] aspect-square flex items-center justify-center cursor-pointer hover:bg-primaryHover transition-colors"
        >
          {relay.name && (
            <div className="text-center">
              <h3 className="text-primaryText font-medium">{relay.name}</h3>
              {relay.description && (
                <p className="text-primaryText text-sm mt-1">
                  {relay.description}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
