import { Star, StarBorder } from "@mui/icons-material";

function VenueRating({ rating }) {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) =>
        i < rating ? (
          <Star key={i} fontSize="small" className="text-500" />
        ) : (
          <StarBorder key={i} fontSize="small" className="text-gray-400" />
        )
      )}
    </div>
  );
}

export default VenueRating;


