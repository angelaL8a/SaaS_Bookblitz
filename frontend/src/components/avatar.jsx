import PropTypes from "prop-types";
import CustomImage from "./custom-image";

const Avatar = ({ userImageUrl, name, firstName, lastName }) => {
  return (
    <div className="flex items-center gap-2">
      <CustomImage
        src={userImageUrl}
        alt={name}
        className="rounded-full w-7 h-7"
      />

      <span className="text-[#515151] truncate">
        {firstName} {lastName.charAt(0)}.
      </span>
    </div>
  );
};
Avatar.propTypes = {
  userImageUrl: PropTypes.string,
  name: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

export default Avatar;
