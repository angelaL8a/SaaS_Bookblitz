import { useCallback, useRef } from "react";

const Videos = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const shouldSkipScroll = (
    element: Element | null,
    className: string
  ): boolean => {
    if (!element) {
      return false;
    }

    if (element.classList.contains(className)) {
      return true;
    }

    let parent = element.parentElement;
    while (parent) {
      if (parent.classList.contains(className)) {
        return true;
      }
      parent = parent.parentElement;
    }

    return false;
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const ele = containerRef.current;
    if (!ele || shouldSkipScroll(e.target as Element, "no-scroll")) {
      return;
    }

    const startPos = {
      left: ele.scrollLeft,
      top: ele.scrollTop,
      x: e.clientX,
      y: e.clientY,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;
      ele.scrollTop = startPos.top - dy;
      ele.scrollLeft = startPos.left - dx;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const ele = containerRef.current;
    if (!ele || shouldSkipScroll(e.touches[0].target as Element, "no-scroll")) {
      return;
    }

    const touch = e.touches[0];

    const startPos = {
      left: ele.scrollLeft,
      top: ele.scrollTop,
      x: touch.clientX,
      y: touch.clientY,
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const dx = touch.clientX - startPos.x;
      const dy = touch.clientY - startPos.y;
      ele.scrollTop = startPos.top - dy;
      ele.scrollLeft = startPos.left - dx;
    };

    const handleTouchEnd = () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  }, []);

  return (
    <>
      <h3 className="py-10 text-5xl font-bold text-start font-poppins">
        Watch, listen, learn
      </h3>

      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="flex gap-5 overflow-x-auto rounded-lg select-none touch-none"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="aspect-video h-[200px] bg-blue-400 rounded-lg"
          >
            {index}
          </div>
        ))}
      </div>
    </>
  );
};

export default Videos;
