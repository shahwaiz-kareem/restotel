"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function DynamicTabsContainer({
  endpoint,
  categories = [],
  renderCard,
  limit = 6,
  className,
}) {
  const [activeTab, setActiveTab] = useState(categories[0]?.type || "all");
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Ref for the infinite scroll intersection target
  const loaderRef = useRef(null);

  // Core Data Fetching Engine
  const fetchData = useCallback(
    async (targetTab, targetPage, isAppending = false) => {
      if (!endpoint) return;
      setLoading(true);

      try {
        const queryParam =
          targetTab !== "all"
            ? `category=${encodeURIComponent(targetTab)}&`
            : "";
        const url = `${endpoint}?${queryParam}page=${targetPage}&limit=${limit}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Network request failed");

        const result = await response.json();
        const fetchedItems = result?.documents || result || [];

        setItems((prev) =>
          isAppending ? [...prev, ...fetchedItems] : fetchedItems
        );

        setHasMore(fetchedItems.length === limit);
      } catch (error) {
        console.error("Error retrieving dataset:", error);
        if (!isAppending) setItems([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [endpoint, limit]
  );

  // 1. Synchronize Layout Tracks
  useEffect(() => {
    setPage(1);
    fetchData(activeTab, 1, false);
  }, [activeTab, fetchData]);

  // 2. Infinite Scroll Pagination Handler
  const handleLoadMore = useCallback(() => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(activeTab, nextPage, true);
  }, [loading, hasMore, page, activeTab, fetchData]);

  // 3. Intersection Observer Setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Trigger load slightly before the user reaches the absolute bottom
        if (entries[0].isIntersecting && hasMore && !loading) {
          handleLoadMore();
        }
      },
      { rootMargin: "200px" } // 200px threshold for seamless UX
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [handleLoadMore, hasMore, loading]);

  return (
    <div
      className={cn(
        // Added overflow-x-hidden to the parent to prevent child elements from breaking the viewport width
        "w-full px-2 mt-20  py-12 space-y-8 select-none overflow-x-hidden",
        className
      )}
    >
      {categories.length > 0 && (
        <div className="flex w-full">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-full"
          >
            {/* Added arbitrary Tailwind classes to hide scrollbars while allowing touch scrolling */}
            <TabsList className="h-14 z-50 left-0 p-1.5 fixed top-20  backdrop-blur-xl shadow-sm flex items-center gap-2 overflow-x-auto overflow-y-hidden whitespace-nowrap w-full justify-start sm:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <TabsTrigger
                value={"all"}
                className="rounded-lg text-sm font-medium tracking-wide px-6 py-4.5 transition-all duration-300 flex-shrink-0 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                All
              </TabsTrigger>
              {categories.map((tab) => (
                <TabsTrigger
                  key={tab.type}
                  value={tab.type}
                  className="rounded-lg text-sm font-medium tracking-wide px-6 py-4.5 transition-all duration-300 flex-shrink-0 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      )}

      {items.length > 0 ? (
        // Added min-w-0 to prevent flex/grid blowouts
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-w-0 ">
          {items.map((item, index) => (
            <div
              key={item._id || item.id || index}
              // Enforced full width and min-width to ensure the renderCard stays bounded
              className="w-full min-w-0 rounded-[2rem] overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1 bg-card shadow-sm border border-border/50"
            >
              {renderCard ? (
                renderCard(item)
              ) : (
                <div className="p-8 text-xs font-mono text-muted-foreground">
                  Configure renderCard prop
                </div>
              )}
            </div>
          ))}
        </div>
      ) : loading ? (
        <div className="w-full h-40 flex items-center justify-center  border-border mt-8">
          <Loader2 size={40} className="animate-spin text-primary " />
        </div>
      ) : (
        <div className="w-full h-40 flex items-center justify-center rounded-[2rem] bg-muted/20 border border-dashed border-border mt-8">
          <p className="text-sm font-sans font-medium text-muted-foreground">
            No items found in this category.
          </p>
        </div>
      )}

      {/* Invisible Intersection Target & Loading Indicator */}
      <div
        ref={loaderRef}
        className="w-full flex justify-center py-8 min-h-[4rem]"
      >
        {loading && items.length > 0 && (
          <div className="flex flex-col items-center gap-2">
            <svg
              className="animate-spin h-6 w-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="text-xs font-medium text-muted-foreground tracking-widest uppercase">
              Loading...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
