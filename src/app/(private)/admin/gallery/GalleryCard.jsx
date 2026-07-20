import { Button } from "@/components/ui/button";
import { Edit3, ImageIcon } from "lucide-react";
import React from "react";

const GalleryCard = ({
  item: image,
  setItemData,
  setShowForm,
  setUpdateItem,
}) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-200/50 dark:hover:shadow-none">
      {/* Cinematic Media Frame */}

      <div className="shadow-xl z-20 capitalize bg-muted rounded text-sm flex items-center justify-center px-2 py-1 absolute top-2 left-2 ">
        {image?.category}
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
        {image.imageUrl ? (
          <img
            src={image.imageUrl}
            alt={image.name}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-neutral-500">
            <ImageIcon className="h-12 w-12 stroke-[1.2] transition-transform duration-300 group-hover:scale-105" />
            <span className="mt-2 text-xs font-medium tracking-wider uppercase opacity-60">
              Gallery Showcase
            </span>
          </div>
        )}
      </div>

      {/* Text Container */}
      <div className="flex flex-grow flex-col p-5">
        <h3 className="font-semibold text-lg tracking-tight text-foreground transition-colors group-hover:text-primary">
          {image.name}
        </h3>

        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground leading-relaxed flex-grow">
          {image.description}
        </p>

        {/* Minimal Action Footer */}
        <div className="mt-4 flex items-center justify-end pt-3 border-t border-muted/60">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setItemData(image);
              setShowForm(true);
              setUpdateItem(true);
            }}
            className="h-9 gap-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted font-medium transition-colors"
          >
            <Edit3 className="h-3.5 w-3.5" />
            Edit Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
