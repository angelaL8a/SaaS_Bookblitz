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
              });
            }}
            className="absolute top-2 right-2 rounded-full bg-white/50 backdrop-blur h-8 w-8 flex items-center justify-center text-white"
          >
            <XIcon className="h-4 w-4" />
          </button>

          <img
            src={previewPhoto}
            className="w-full h-full object-cover"
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
          <PlusCircleIcon className="h-5 mb-1 text-muted-foreground w-5" />
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
