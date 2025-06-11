import { useState } from "react";
import { Headline } from "../Headline/headline";
import { Filter } from "../ui/Filter/filter";

// All strings and constants are imported from the constants file when it will merged

type ArenaHeaderProps = {
  headline: string;
  description: string;
  className?: string;
};

export const ArenaHeader = ({
  headline,
  description,
  className = "",
}: ArenaHeaderProps) => {
  const [isInFight, setIsInFight] = useState(true);

  return (
    <div className={`arena-header ${className}`}>
      <Headline className="text-5xl font-bold mb-4">{headline}</Headline>
      <p className="text-xl text-gray-600">{description}</p>

      {isInFight && (
        <div className="flex items-start">
          <Filter
            options={[
              { label: "Attack", value: "attack" },
              { label: "Defense", value: "defense" },
            ]}
            value={null}
            onChange={(value) => console.log("Filter changed:", value)}
            label="Pokemon"
            showDateRangeIcon={false}
          />
        </div>
      )}
    </div>
  );
};

export default ArenaHeader;
