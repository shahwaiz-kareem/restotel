"use client";

import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  ArrowLeft,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Settings2,
  Trash2,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TableContainer({
  CrudForm,
  itemType,
  headerDesc,
  headerTitle,
  itemsList = [],
  fetchEndpoint,
  deleteAction,
  columns = [
    { key: "name", label: "Name" },
    { key: "roomType", label: "Type" },
    { key: "pricePerNight", label: "Price" },
    { key: "isAvailable", label: "Availability", render: (val) => String(val) },
  ],
}) {
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
  const itemsPerPage = 8;

  // Column Visibility States
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map((c) => c.key)
  );
  const [showColMenu, setShowColMenu] = useState(false);
  const colMenuRef = useRef(null);

  const loadItems = useCallback(async () => {
    if (!fetchEndpoint) {
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
  }, []);

  // Handle column dropdown click away
  useEffect(() => {
    function handleClickOutside(event) {
      if (colMenuRef.current && !colMenuRef.current.contains(event.target)) {
        setShowColMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      setUpdateItem(false);
      setItemData({});
      setShowForm(false);
      setCurrentPage(1);
    };
  }, []);

  // Compute Search Client-side (supports matching all endpoints)
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const searchLower = searchTerm.toLowerCase();
      return Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchLower)
      );
    });
  }, [items, searchTerm]);

  // Compute Pagination
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

  const handleRowClick = (item) => {
    setItemData(item);
    setUpdateItem(true);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    loadItems();
  };

  const handleDelete = async (e, id, imageId) => {
    e.stopPropagation();
    if (!deleteAction) return alert("Deletion logic not connected.");
    if (!window.confirm(`Are you sure you want to delete this ${itemType}?`))
      return;

    try {
      const response = await deleteAction(id, imageId);
      if (response?.success) {
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

  const toggleColumn = (key) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  if (showForm) {
    return (
      <div className="space-y-6 p-4 sm:p-6 w-full max-w-2xl  animate-in fade-in duration-200">
        <Button
          variant="ghost"
          onClick={() => setShowForm(false)}
          className="flex items-center gap-2 text-primary hover:text-primary/80 rounded-xl"
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

  return (
    <div className="space-y-6 p-4 sm:p-6 w-full max-w-7xl mx-auto animate-in fade-in duration-200">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-5 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight ">{headerTitle}</h1>
          <p className="text-muted-foreground text-sm mt-1">{headerDesc}</p>
        </div>

        <Button
          onClick={handleAddNew}
          className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-transform duration-200 active:scale-95 w-full sm:w-auto"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
        </Button>
      </div>

      {/* SEARCH & FILTER CONTROLS */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-neutral-900/50 p-3 rounded-xl border border-neutral-800">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            placeholder={`Search ${itemType}s...`}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9 pr-4 h-10 rounded-xl bg-neutral-950 border-neutral-800 text-foreground"
          />
        </div>

        <div className="relative w-full sm:w-auto" ref={colMenuRef}>
          <Button
            variant="outline"
            onClick={() => setShowColMenu(!showColMenu)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border-neutral-800 bg-neutral-950 text-foreground hover:bg-neutral-900"
          >
            <Settings2 className="h-4 w-4" />
            Columns
          </Button>

          {showColMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-neutral-950 border border-neutral-800 shadow-xl rounded-xl p-2 z-50">
              <p className="text-xs font-semibold text-muted-foreground px-2 pb-2 mb-2 border-b border-neutral-800">
                Toggle Columns
              </p>
              {columns.map((col) => (
                <label
                  key={col.key}
                  className="flex items-center gap-2 px-2 py-1.5 hover:bg-neutral-900 rounded-lg cursor-pointer text-sm text-foreground"
                >
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(col.key)}
                    onChange={() => toggleColumn(col.key)}
                    className="rounded border-neutral-800 bg-neutral-950 text-primary focus:ring-primary"
                  />
                  {col.label}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CORE DATA DISPLAY */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[350px] border border-dashed border-neutral-800 rounded-2xl bg-neutral-900/10 p-8 text-center">
          <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            Fetching Database...
          </h3>
        </div>
      ) : paginatedItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[350px] border border-dashed border-neutral-800 rounded-2xl bg-neutral-900/10 p-8 text-center">
          <Database className="h-10 w-10 text-muted-foreground/50 mb-4 stroke-[1.5]" />
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            No {itemType} assets found
          </h3>
          <p className="text-xs text-muted-foreground max-w-xs mt-1">
            Try resetting your filters or hit the action button to upload data.
          </p>
        </div>
      ) : (
        <div className="border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-950/40 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="text-xs uppercase bg-neutral-900 text-muted-foreground font-semibold border-b border-neutral-800">
                <tr>
                  {columns
                    .filter((col) => visibleColumns.includes(col.key))
                    .map((col) => (
                      <th key={col.key} className="px-6 py-4 tracking-wider">
                        {col.label}
                      </th>
                    ))}
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {paginatedItems.map((item) => (
                  <tr
                    key={item.id || item.$id}
                    onClick={() => handleRowClick(item)}
                    className="hover:bg-neutral-900/60 cursor-pointer transition-colors group"
                  >
                    {columns
                      .filter((col) => visibleColumns.includes(col.key))
                      .map((col) => (
                        <td
                          key={col.key}
                          className="px-6 py-4 whitespace-nowrap text-neutral-300"
                        >
                          {col.render
                            ? col.render(item[col.key], item)
                            : item[col.key] !== undefined &&
                              item[col.key] !== null
                            ? String(item[col.key])
                            : "—"}
                        </td>
                      ))}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={(e) =>
                          handleDelete(e, item.$id || item.id, item.imageId)
                        }
                        className="p-2 text-muted-foreground hover:bg-red-950/40 hover:text-red-500 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Delete Asset"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION PANEL */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-neutral-800 bg-neutral-900/20">
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

            <div className="flex items-center gap-2 order-1 sm:order-2 w-full sm:w-auto justify-between sm:justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="h-9 rounded-xl border-neutral-800 text-xs font-medium px-3 gap-1 bg-neutral-950 active:scale-95 disabled:opacity-50"
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
                className="h-9 rounded-xl border-neutral-800 text-xs font-medium px-3 gap-1 bg-neutral-950 active:scale-95 disabled:opacity-50"
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
}
