import PropTypes from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import { StarIconFill, StarIcon } from "../icons";

const Rating = ({ value, color }) => {
  const [stars, setStars] = useState(Array.from({ length: 5 }));

  useEffect(() => {
    setStars((prevStars) => {
      const updatedStars = prevStars.map((_, index) =>
        index < value ? (
          <StarIconFill key={index} className="w-6 h-6" color={color} />
        ) : (
          <StarIcon key={index} className="w-6 h-6 text-muted-foreground" />
        )
      );
      return updatedStars;
    });
  }, [value, color]);

  return <div className="flex items-center">{stars}</div>;
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default Rating;
