"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  Plus,
  Search,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CardsContainer = ({
  CrudForm,
  itemType,
  ItemCard,
  headerDesc,
  headerTitle,
  itemsList = [], // Fallback mock data
  fetchEndpoint, // Appwrite Fetch: (page, limit) => Promise
  deleteAction, // Appwrite Delete: (id, imageId) => Promise
}) => {
  // Form & Editing States
  const [showForm, setShowForm] = useState(false);
  const [updateItem, setUpdateItem] = useState(false);
  const [itemData, setItemData] = useState({});

  // Server Data States
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Operational Interaction States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const loadItems = useCallback(async () => {
    if (!fetchEndpoint) {
      // Fallback to client-side mock data
      setItems(itemsList);
      setTotal(itemsList.length);
      return;
    }

    setIsLoading(true);
    try {
      const req = await fetch(
        `/api/${fetchEndpoint}?page=${currentPage}&limit=${itemsPerPage}`
      );
      const response = await req.json();
      if (response?.success) {
        setItems(response.documents);
        setTotal(response.total);
      }
    } catch (error) {
      console.error(`Failed to load ${itemType}:`, error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchEndpoint, currentPage, itemsPerPage, itemsList, itemType]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // 2. SEARCH ENGINE COMPUTE
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const searchLower = searchTerm.toLowerCase();
      const nameMatch = item.name?.toLowerCase().includes(searchLower);
      const descMatch = item.description?.toLowerCase().includes(searchLower);
      const categoryMatch = (item.category || item.roomType || "")
        .toLowerCase()
        .includes(searchLower);

      return nameMatch || descMatch || categoryMatch;
    });
  }, [items, searchTerm]);

  const paginatedItems = useMemo(() => {
    if (fetchEndpoint) return filteredItems;
    const startOffset = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startOffset, startOffset + itemsPerPage);
  }, [filteredItems, fetchEndpoint, currentPage, itemsPerPage]);

  const totalPages = fetchEndpoint
    ? Math.ceil(total / itemsPerPage) || 1
    : Math.ceil(filteredItems.length / itemsPerPage) || 1;

  // Action Handlers
  const handleAddNew = () => {
    setItemData({});
    setUpdateItem(false);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    loadItems(); // Refresh live data after Create/Update
  };

  const handleDelete = async (id, imageId) => {
    if (!deleteAction) return alert("Deletion logic not connected.");
    if (!window.confirm(`Are you sure you want to delete this ${itemType}?`))
      return;

    try {
      const response = await deleteAction(id, imageId);
      if (response?.success) {
        // Drop back a page if you delete the final item on the current view
        if (paginatedItems.length === 1 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        } else {
          loadItems();
        }
      } else {
        alert(response?.error || "Failed to delete item.");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // Form View Render
  if (showForm) {
    return (
      <div className="space-y-6 p-6 max-w-xl mx-auto md:mx-0">
        <Button
          variant="ghost"
          onClick={() => setShowForm(false)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground rounded-xl"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to List
        </Button>

        <CrudForm
          itemData={itemData}
          updateItem={updateItem}
          onSuccess={handleFormSuccess}
        />
      </div>
    );
  }

  // Active Grid View Render
  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-5 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            {headerTitle}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">{headerDesc}</p>
        </div>

        <Button
          onClick={handleAddNew}
          className="rounded-xl shadow-md transition-transform duration-200 active:scale-95 w-full sm:w-auto"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
        </Button>
      </div>

      {/* SEARCH INTERACTION TOOLBAR */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            placeholder={`Search through ${itemType} assets...`}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9 pr-4 h-10 rounded-xl bg-card border-muted/80 shadow-sm"
          />
        </div>
      </div>

      {/* CORE GRID / STATES */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[350px] border border-dashed rounded-2xl bg-muted/10 p-8 text-center">
          <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
          <h3 className="text-base font-semibold tracking-tight">
            Fetching Database...
          </h3>
        </div>
      ) : paginatedItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[350px] border border-dashed rounded-2xl bg-muted/20 p-8 text-center">
          <ImageIcon className="h-10 w-10 text-muted-foreground/50 mb-4 stroke-[1.5]" />
          <h3 className="text-base font-semibold tracking-tight">
            No matching gallery assets
          </h3>
          <p className="text-xs text-muted-foreground max-w-xs mt-1">
            Try resetting your search query string or hit the add action button
            to register new uploads.
          </p>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Main Visual Responsive Asset Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedItems.map((item) => (
              <ItemCard
                key={item.id || item.$id}
                item={item}
                setItemData={setItemData}
                setShowForm={setShowForm}
                setUpdateItem={setUpdateItem}
                onDelete={() => handleDelete(item.$id || item.id, item.imageId)}
              />
            ))}
          </div>

          {/* PAGINATION INTERACTION CONTROLS BAR */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-muted/60">
            {/* Contextual Metric Range Counter */}
            <div className="text-xs text-muted-foreground font-medium order-2 sm:order-1">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {total === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-foreground">
                {fetchEndpoint
                  ? Math.min(currentPage * itemsPerPage, total)
                  : Math.min(currentPage * itemsPerPage, filteredItems.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-foreground">
                {fetchEndpoint ? total : filteredItems.length}
              </span>{" "}
              assets
            </div>

            {/* Page Navigation Action Buttons */}
            <div className="flex items-center gap-2 order-1 sm:order-2 w-full sm:w-auto justify-between sm:justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="h-9 rounded-xl text-xs font-medium px-3 gap-1 shadow-sm transition-all bg-card active:scale-95 disabled:opacity-50"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Previous
              </Button>

              <div className="text-xs font-semibold text-muted-foreground px-2">
                Page {currentPage} of {totalPages}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage >= totalPages}
                className="h-9 rounded-xl text-xs font-medium px-3 gap-1 shadow-sm transition-all bg-card active:scale-95 disabled:opacity-50"
              >
                Next
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardsContainer;
