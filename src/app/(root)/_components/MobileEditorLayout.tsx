"use client";

import { useState } from "react";
import { Play, Code2, Terminal, ShareIcon, RotateCcwIcon } from "lucide-react";
import EditorPanel from "./EditorPanel";
import OutputPanel from "./OutputPanel";
import RunButton from "./RunButton";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { motion } from "framer-motion";
import ShareSnippetDialog from "./ShareSnippetDialog";
import { LANGUAGE_CONFIG } from "../_constants";

export default function MobileEditorLayout() {
  const [activeTab, setActiveTab] = useState<"editor" | "output">("editor");
  const { isRunning } = useCodeEditorStore();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  function handleRefresh() {
    const { language, editor } = useCodeEditorStore.getState();
    const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(defaultCode);
    localStorage.removeItem(`editor-code-${language}`);
  }

  return (
    <div className="md:hidden z-0 block rounded-lg w-full h-screen bg-[#0f0f17]">
      {/* Tabs */}
      <div className="sticky rounded top-0 z-20 flex items-center justify-between bg-[#1b1b27] px-4 py-3 shadow-lg border-b border-white/10">
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab("editor")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition ${
              activeTab === "editor"
                ? "bg-blue-500/20 text-blue-300"
                : "text-gray-400"
            }`}
          >
            <Code2 size={18} />
            
          </button>

          <button
            onClick={() => setActiveTab("output")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition ${
              activeTab === "output"
                ? "bg-green-500/20 text-green-300"
                : "text-gray-400"
            }`}
          >
            <Terminal size={18} />
          </button>
        </div>

        <div className="flex gap-3 justify-center items-center ">
          <div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="p-2 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-lg ring-1 ring-white/5 transition-colors"
              aria-label="Reset to default code"
            >
              <RotateCcwIcon className="size-4 text-gray-400" />
            </motion.button>
          </div>
          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsShareDialogOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg overflow-hidden bg-gradient-to-r
               bg-yellow-400  opacity-90 hover:opacity-100 transition-opacity"
            >
              <ShareIcon className="size-4 text-yellow-800" />
              <span className="md:block hidden text-sm font-medium text-yellow-800">
                Share
              </span>
            </motion.button>
          </div>
          <div onClick={() => setTimeout(() => setActiveTab("output"), 1000)}>
            <RunButton />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full h-[calc(100vh-60px)] overflow-hidden">
        {activeTab === "editor" ? (
          <div className="h-full overflow-auto">
            <EditorPanel />
          </div>
        ) : (
          <div className="h-full overflow-auto ">
            <OutputPanel />
          </div>
        )}
      </div>

      {isShareDialogOpen && (
        <ShareSnippetDialog onClose={() => setIsShareDialogOpen(false)} />
      )}
    </div>
  );
}
