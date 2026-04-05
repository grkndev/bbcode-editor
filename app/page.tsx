"use client";
import * as React from "react";
import { BBCodeRenderer } from "@/components/BBCodeRenderer";
import Header from "@/components/Header";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  
} from "@/components/ui/resizable";
import { usePanelRef } from "react-resizable-panels";

export default function Home() {
  const [value, setValue] = React.useState("");
  const [fontSize, setFontSize] = React.useState(16);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [selection, setSelection] = React.useState({ start: 0, end: 0 });
  const selectionRef = React.useRef({ start: 0, end: 0 });
  const leftPanelRef = usePanelRef()
  const rightPanelRef = usePanelRef()
  const [panelLayoutSize, setPanelLayoutSize] = React.useState<
    "left" | "default" | "right"
  >("default");
  

  const isTagActive = (tag: string): boolean => {
    const { start, end } = selection;
    const regex = new RegExp(`\\[${tag}\\]([\\s\\S]*?)\\[\\/${tag}\\]`, "gi");
    let match;
    while ((match = regex.exec(value)) !== null) {
      const mStart = match.index;
      const mEnd = mStart + match[0].length;
      if (start >= mStart && end <= mEnd) return true;
    }
    return false;
  };
  React.useEffect(() => {
    const handler = () => {
      const ta = textareaRef.current;
      if (document.activeElement !== ta) return;
      const s = { start: ta!.selectionStart, end: ta!.selectionEnd };
      selectionRef.current = s;
      setSelection(s); // re-render tetikler
    };
    document.addEventListener("selectionchange", handler);
    return () => document.removeEventListener("selectionchange", handler);
  }, []);

  const insertTag = (open: string, close: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const { start, end } = selectionRef.current;

    // tag adını open'dan çıkar: "[b]" → "b", "[size=16]" → "size"
    const tagName = open.replace(/\[(\w+)[^\]]*\]/, "$1");
    const regex = new RegExp(
      `\\[${tagName}[^\\]]*\\]([\\s\\S]*?)\\[\\/${tagName}\\]`,
      "gi",
    );

    let match;
    while ((match = regex.exec(value)) !== null) {
      const mStart = match.index;
      const mEnd = mStart + match[0].length;
      if (start >= mStart && end <= mEnd) {
        // tag zaten var — kaldır
        const inner = match[1];
        const newValue = value.slice(0, mStart) + inner + value.slice(mEnd);
        setValue(newValue);
        requestAnimationFrame(() => {
          ta.focus();
          ta.selectionStart = mStart;
          ta.selectionEnd = mStart + inner.length;
          selectionRef.current = {
            start: ta.selectionStart,
            end: ta.selectionEnd,
          };
          setSelection({ start: ta.selectionStart, end: ta.selectionEnd });
        });
        return;
      }
    }

    // tag yok — ekle
    const selected = value.slice(start, end);
    const newValue =
      value.slice(0, start) + open + selected + close + value.slice(end);
    setValue(newValue);
    requestAnimationFrame(() => {
      ta.focus();
      ta.selectionStart = start + open.length;
      ta.selectionEnd = start + open.length + selected.length;
      selectionRef.current = { start: ta.selectionStart, end: ta.selectionEnd };
      setSelection({ start: ta.selectionStart, end: ta.selectionEnd });
    });
  };

  const updateSize = (delta: number) => {
    const { start } = selectionRef.current;
    const sizeRegex = /\[size=(\d+)\]([\s\S]*?)\[\/size\]/g;
    let match;
    let found = false;

    while ((match = sizeRegex.exec(value)) !== null) {
      const mStart = match.index;
      const mEnd = mStart + match[0].length;
      if (start >= mStart && start <= mEnd) {
        const newSize = Math.min(Math.max(parseInt(match[1]) + delta, 8), 72);
        setFontSize(newSize);
        setValue(
          value.slice(0, mStart) +
            `[size=${newSize}]${match[2]}[/size]` +
            value.slice(mEnd),
        );
        found = true;
        break;
      }
    }

    if (!found) {
      const newSize = Math.min(Math.max(fontSize + delta, 8), 72);
      setFontSize(newSize);
      const open = `[size=${newSize}]`;
      const close = `[/size]`;
      const { start, end } = selectionRef.current;
      const selected = value.slice(start, end);
      const newValue =
        value.slice(0, start) + open + selected + close + value.slice(end);
      setValue(newValue);
      requestAnimationFrame(() => {
        const ta = textareaRef.current;
        if (!ta) return;
        ta.focus();
        ta.selectionStart = start + open.length;
        ta.selectionEnd = start + open.length + selected.length;
        selectionRef.current = {
          start: ta.selectionStart,
          end: ta.selectionEnd,
        };
      });
    }
  };
  const alignTags = ["left", "center", "right", "justify"];

  const insertAlignTag = (tag: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const { start, end } = selectionRef.current;

    // mevcut hizalama tag'i var mı kontrol et
    for (const align of alignTags) {
      const regex = new RegExp(
        `\\[${align}\\]([\\s\\S]*?)\\[\\/${align}\\]`,
        "gi",
      );
      let match;
      while ((match = regex.exec(value)) !== null) {
        const mStart = match.index;
        const mEnd = mStart + match[0].length;
        if (start >= mStart && end <= mEnd) {
          const inner = match[1];
          if (align === tag) {
            // aynı tag — kaldır
            const newValue = value.slice(0, mStart) + inner + value.slice(mEnd);
            setValue(newValue);
            requestAnimationFrame(() => {
              ta.focus();
              ta.selectionStart = mStart;
              ta.selectionEnd = mStart + inner.length;
              selectionRef.current = {
                start: ta.selectionStart,
                end: ta.selectionEnd,
              };
              setSelection({ start: ta.selectionStart, end: ta.selectionEnd });
            });
          } else {
            // farklı tag — eskiyi kaldır, yenisini ekle
            const open = `[${tag}]`;
            const close = `[/${tag}]`;
            const newValue =
              value.slice(0, mStart) + open + inner + close + value.slice(mEnd);
            setValue(newValue);
            requestAnimationFrame(() => {
              ta.focus();
              ta.selectionStart = mStart + open.length;
              ta.selectionEnd = mStart + open.length + inner.length;
              selectionRef.current = {
                start: ta.selectionStart,
                end: ta.selectionEnd,
              };
              setSelection({ start: ta.selectionStart, end: ta.selectionEnd });
            });
          }
          return;
        }
      }
    }

    // hiç hizalama tag'i yok — ekle
    const open = `[${tag}]`;
    const close = `[/${tag}]`;
    const selected = value.slice(start, end);
    const newValue =
      value.slice(0, start) + open + selected + close + value.slice(end);
    setValue(newValue);
    requestAnimationFrame(() => {
      ta.focus();
      ta.selectionStart = start + open.length;
      ta.selectionEnd = start + open.length + selected.length;
      selectionRef.current = { start: ta.selectionStart, end: ta.selectionEnd };
      setSelection({ start: ta.selectionStart, end: ta.selectionEnd });
    });
  };
  function changePanelLayout(layout: "left" | "default" | "right") {
    switch (layout) {
      case "default":
        setPanelLayoutSize("default");
      case "left":
        setPanelLayoutSize("left");
      case "right":
        setPanelLayoutSize("right");
    }
  }
  return (
    <div className="h-screen flex flex-col">
      <Header
        onInsertTag={insertTag}
        onInsertAlignTag={insertAlignTag}
        onUpdateSize={updateSize}
        fontSize={fontSize}
        isTagActive={isTagActive}
        changePanelLayout={changePanelLayout}
        leftPanel={leftPanelRef}
        rightPanel={rightPanelRef}
      />
      <ResizablePanelGroup orientation="horizontal" className="flex-1 min-h-0">
      <ResizablePanel defaultSize={"50%"} collapsible collapsedSize={"100%"} panelRef={leftPanelRef}>
              <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full h-full resize-none p-3 outline-none font-mono text-sm bg-background"
                placeholder="BBCode yaz..."
                spellCheck={false}
              />
            </ResizablePanel>
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={"50%"} collapsedSize={"100%"} collapsible panelRef={rightPanelRef}>
            <div className="h-full overflow-auto p-3">
              <BBCodeRenderer content={value} />
            </div>
          </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
