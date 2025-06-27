interface RoomDetailCard {
  id: number;
  title?: string;
  content?: string;
}

interface RoomDetailGridProps {
  cards: RoomDetailCard[];
  className?: string;
}

export default function RoomDetailGrid({ cards, className = "" }: RoomDetailGridProps) {
  return (
    <div className={`grid grid-cols-2 gap-5 w-[90%] max-w-[420px] mx-auto ${className}`}>
      {cards.map((card) => (
        <div 
          key={card.id} 
          className="bg-[#E0D9D9] border border-[#7B5858] rounded-2xl min-h-[160px] min-w-[140px] aspect-square flex items-center justify-center cursor-pointer hover:bg-[#D5CECE] transition-colors"
        >
          {card.title && (
            <div className="text-center">
              <h3 className="text-[#7B5858] font-medium">{card.title}</h3>
              {card.content && (
                <p className="text-[#7B5858] text-sm mt-1">{card.content}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 