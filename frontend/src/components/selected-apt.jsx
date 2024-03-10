import PropTypes from "prop-types";
import CustomImage from "./custom-image";
import Avatar from "./avatar";
import Rating from "./table/rating";
import { MessageSquareIcon } from "lucide-react";
import { motion } from "framer-motion";
import {
  cn,
  convertTime,
  extractDateInfo,
  gradientPastelColors,
} from "@/lib/utils";
import { shuffle } from "lodash";

const SelectedApt = ({ selectedApt, setSelectedApt }) => {
  const bgColor = shuffle(gradientPastelColors()).pop();

  const user = selectedApt.client ? selectedApt.client : selectedApt.employee;

  const dateInfo = extractDateInfo(selectedApt.date);

  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
      className="bg-gradient-to-b from-[#FFFFFF] from-100% via-[#F6FCFF] via-[77%] to-[#FAFDFF] to-[88%] shadow-[0px_4px_37.9px_-5px_rgba(0,0,0,0.07)] rounded-lg p-5"
    >
      <div className="relative">
        <CustomImage
          src={selectedApt.referencialImageUrl}
          alt={selectedApt.title}
          className={cn(
            "rounded-md relative w-full aspect-w-16 aspect-h-9",
            bgColor.color
          )}
        />

        <div className="absolute flex justify-center gap-3 right-3 bottom-3 left-3">
          <AptInfo label={dateInfo.monthName.slice(0, 3)}>
            {dateInfo.dayNumber}
          </AptInfo>

          <AptInfo label="Hour">
            {convertTime(selectedApt.startTime)} -{" "}
            {convertTime(selectedApt.endTime)}
          </AptInfo>

          <AptInfo label="Price">${selectedApt.fee}</AptInfo>
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-1 text-xs text-[#515151]">Title</p>
        <h2 className="text-[#2B2B2B]">{selectedApt.title}</h2>
      </div>

      <div className="mt-4">
        <p className="mb-1 text-xs text-[#515151]">Description</p>
        <h2 className="text-[#2B2B2B]">{selectedApt.description}</h2>
      </div>

      <div className="flex items-center gap-5 mt-8">
        <div className="flex flex-col items-center w-1/2 gap-1">
          {user?.user ? (
            <Avatar
              firstName={user.user.firstName}
              lastName={user.user.lastName}
              userImageUrl={user.user.userImageUrl}
              name={user.user.name}
            />
          ) : null}

          <Rating
            color={"#009A7F"}
            value={Math.floor(Math.random() * (5 - 1 + 1)) + 1}
          />
        </div>

        <button className="flex items-center text-[#515151] rounded-sm h-12 feedback_button bg-[rgba(246,248,255,0.43)] px-3 py-8">
          <MessageSquareIcon className="w-5 h-5 mr-2" />
          Leave Feedback
        </button>
      </div>

      <div className="flex justify-center mt-8">
        <button
          type="button"
          onClick={() => setSelectedApt(null)}
          className="py-4 px-14 text-[#9BA0AD] bg-gradient-to-b from-[rgba(200,192,255,0.54)] to-[rgba(200,192,255,0.6)] shadow-[2px_4px_5.5px_0px_rgba(174,174,192,0.23)] rounded-md text-lg font-medium"
        >
          Done
        </button>
      </div>
    </motion.div>
  );
};
SelectedApt.propTypes = {
  selectedApt: PropTypes.object.isRequired,
  setSelectedApt: PropTypes.func.isRequired,
};

const AptInfo = ({ children, label }) => {
  return (
    <div className="flex flex-col items-center px-4 py-2 bg-white rounded-lg">
      <span className="text-[#31747C] text-xl font-bold font-poppins">
        {children}
      </span>

      <span className="text-[#4FBBC8] font-bold font-petrona">{label}</span>
    </div>
  );
};
AptInfo.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
};

export default SelectedApt;
