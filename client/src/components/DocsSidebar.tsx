import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export interface SidebarItem {
  label: string;
  href?: string;
  children?: { label: string; href?: string }[];
}

interface DocsSidebarProps {
  sections: SidebarSection[];
  activeItem: string;
  onItemClick: (label: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const DocsSidebar = ({
  sections,
  activeItem,
  onItemClick,
  isOpen,
  onClose,
}: DocsSidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    "Start Building": true,
  });

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const sidebar = (
    <nav className="py-6 pr-4 pl-6 space-y-7">
      {sections.map((section) => (
        <div key={section.title}>
          {/* Section title */}
          <h4 className="text-[11px] font-bold uppercase tracking-[0.08em] text-gray-400 mb-3 px-2">
            {section.title}
          </h4>

          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedItems[item.label] ?? false;
              const isActive = activeItem === item.label;

              return (
                <li key={item.label}>
                  <button
                    onClick={() => {
                      if (hasChildren) {
                        toggleExpand(item.label);
                      }
                      onItemClick(item.label);
                    }}
                    className={`
                      w-full flex items-center justify-between gap-2 px-2 py-[7px] rounded-lg text-[13.5px] font-medium transition-all duration-150
                      ${
                        isActive
                          ? "bg-[#e6faf8] text-[#003f3f]"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }
                    `}
                  >
                    <span className="truncate">{item.label}</span>
                    {hasChildren && (
                      <span className="shrink-0 text-gray-400">
                        {isExpanded ? (
                          <ChevronDown className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5" />
                        )}
                      </span>
                    )}
                  </button>

                  {/* Children */}
                  <AnimatePresence>
                    {hasChildren && isExpanded && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden ml-3 border-l border-gray-200 pl-3 mt-0.5 space-y-0.5"
                      >
                        {item.children!.map((child) => {
                          const childActive = activeItem === child.label;
                          return (
                            <li key={child.label}>
                              <button
                                onClick={() => onItemClick(child.label)}
                                className={`
                                  w-full text-left px-2 py-[6px] rounded-md text-[13px] transition-all duration-150
                                  ${
                                    childActive
                                      ? "text-[#028181] font-semibold bg-[#e6faf8]/60"
                                      : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                                  }
                                `}
                              >
                                {child.label}
                              </button>
                            </li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-[260px] shrink-0 border-r border-gray-200 bg-[#fafbfc] h-[calc(100vh-105px)] sticky top-[105px] overflow-y-auto overscroll-contain scrollbar-thin">
        {sidebar}
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40 lg:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 w-[280px] h-full bg-white z-50 overflow-y-auto shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <span
                  className="text-lg font-bold"
                  style={{ fontFamily: "var(--font-heading)", color: "#003f3f" }}
                >
                  Navigation
                </span>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              {sidebar}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DocsSidebar;
