import PropTypes from "prop-types";
import { PlusCircleIcon } from "lucide-react";
import { XIcon } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const ImagePicker = ({ previewPhoto, className, onChange }) => {
  const fileRef = useRef(null);

  return (
    <>
      {previewPhoto ? (
        <div className="w-full row-span-2 h-[140px] border rounded-md relative overflow-hidden">
          <button
            type="button"
            onClick={() => {
              onChange({
                file: null,
                url: null,
                referencialImageId: "",
                referencialImageUrl: "",
              });
            }}
            className="absolute flex items-center justify-center w-8 h-8 text-white rounded-full top-2 right-2 bg-white/50 backdrop-blur"
          >
            <XIcon className="w-4 h-4" />
          </button>

          <img
            src={previewPhoto}
            className="object-cover w-full h-full"
            alt="Preview photo"
          />
        </div>
      ) : (
        <button
          type="button"
          className={cn(
            "w-full row-span-2 h-[140px] border flex-col rounded-md flex items-center justify-center",
            className
          )}
          onClick={() => fileRef.current?.click()}
        >
          <PlusCircleIcon className="w-5 h-5 mb-1 text-muted-foreground" />
          <span className="text-muted-foreground">Select photo</span>
        </button>
      )}

      <input
        type="file"
        ref={fileRef}
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];

          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              onChange({
                file,
                url: reader.result,
              });
            };
            reader.readAsDataURL(file);
          }
        }}
        hidden
      />
    </>
  );
};

ImagePicker.propTypes = {
  previewPhoto: PropTypes.any,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default ImagePicker;
