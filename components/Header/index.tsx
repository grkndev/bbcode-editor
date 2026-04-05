import * as React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import * as Icons from "./Icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface HeaderProps {
  onInsertTag: (open: string, close: string) => void;
  onUpdateSize: (delta: number) => void;
  fontSize: number;
  isTagActive: (tag: string) => boolean;
  onInsertAlignTag: (tag: string) => void;
}

const prevent = (fn: () => void) => (e: React.MouseEvent) => {
  e.preventDefault();
  fn();
};

export default function Header({
  onInsertTag,
  onUpdateSize,
  fontSize,
  isTagActive,
  onInsertAlignTag,
}: HeaderProps) {
  const alignTags = ["left", "center", "right", "justify"];
  return (
    <div className="p-1 flex flex-row gap-2 backdrop-blur-2xl border-b">
      <ToggleGroup
        type="multiple"
        value={["bold", "italic", "underline", "strikethrough"].filter((t) => {
          const map: Record<string, string> = {
            bold: "b",
            italic: "i",
            underline: "u",
            strikethrough: "s",
          };
          return isTagActive(map[t]);
        })}
      >
        <ToggleGroupItem
          value="bold"
          variant="outline"
          onMouseDown={prevent(() => onInsertTag("[b]", "[/b]"))}
        >
          <HugeiconsIcon icon={Icons.TextBoldIcon} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="italic"
          variant="outline"
          onMouseDown={prevent(() => onInsertTag("[i]", "[/i]"))}
        >
          <HugeiconsIcon icon={Icons.TextItalicIcon} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="underline"
          variant="outline"
          onMouseDown={prevent(() => onInsertTag("[u]", "[/u]"))}
        >
          <HugeiconsIcon icon={Icons.TextUnderlineIcon} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="strikethrough"
          variant="outline"
          onMouseDown={prevent(() => onInsertTag("[s]", "[/s]"))}
        >
          <HugeiconsIcon icon={Icons.TextStrikethroughIcon} />
        </ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup
        type="single"
        value={alignTags.find((t) => isTagActive(t)) ?? ""}
      >
        <ToggleGroupItem
          value="left"
          variant="outline"
          onMouseDown={prevent(() => onInsertAlignTag("left"))}
        >
          <HugeiconsIcon icon={Icons.TextAlignLeftIcon} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="center"
          variant="outline"
          onMouseDown={prevent(() => onInsertAlignTag("center"))}
        >
          <HugeiconsIcon icon={Icons.TextAlignCenterIcon} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="right"
          variant="outline"
          onMouseDown={prevent(() => onInsertAlignTag("right"))}
        >
          <HugeiconsIcon icon={Icons.TextAlignRightIcon} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="justify"
          variant="outline"
          onMouseDown={prevent(() => onInsertAlignTag("justify"))}
        >
          <HugeiconsIcon icon={Icons.TextAlignJustifyCenterIcon} />
        </ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup
        type="multiple"
        value={["list", "quote", "code"].filter((t) => {
          const map: Record<string, string> = {
            list: "list",
            quote: "quote",
            code: "code",
          };
          return isTagActive(map[t]);
        })}
      >
        <ToggleGroupItem
          value="list"
          variant="outline"
          onMouseDown={prevent(() => onInsertTag("[list]\n[*]", "\n[/list]"))}
        >
          <HugeiconsIcon icon={Icons.LeftToRightListBulletIcon} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="quote"
          variant="outline"
          onMouseDown={prevent(() => onInsertTag("[quote]", "[/quote]"))}
        >
          <HugeiconsIcon icon={Icons.QuoteDownIcon} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="code"
          variant="outline"
          onMouseDown={prevent(() => onInsertTag("[code]", "[/code]"))}
        >
          <HugeiconsIcon icon={Icons.SourceCodeIcon} />
        </ToggleGroupItem>
      </ToggleGroup>

      <ButtonGroup>
        <Button
          variant="outline"
          onMouseDown={prevent(() =>
            onInsertTag("[color=#000000]", "[/color]"),
          )}
        >
          <HugeiconsIcon icon={Icons.RecordIcon} />
        </Button>
        <Button
          variant="outline"
          onMouseDown={prevent(() => onInsertTag("[hr]", ""))}
        >
          <HugeiconsIcon icon={Icons.SolidLine01Icon} />
        </Button>
        <Button
          variant="outline"
          onMouseDown={prevent(() => onInsertTag("[url=]", "[/url]"))}
        >
          <HugeiconsIcon icon={Icons.Link02Icon} />
        </Button>
        <Button
          variant="outline"
          onMouseDown={prevent(() => onInsertTag("[img]", "[/img]"))}
        >
          <HugeiconsIcon icon={Icons.Image01Icon} />
        </Button>
        <Button
          variant="outline"
          onMouseDown={prevent(() =>
            onInsertTag("[table]\n[tr][td]", "[/td][/tr]\n[/table]"),
          )}
        >
          <HugeiconsIcon icon={Icons.TableIcon} />
        </Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button variant="outline" onMouseDown={prevent(() => onUpdateSize(1))}>
          <HugeiconsIcon icon={Icons.PlusSignIcon} />
        </Button>
        <Button variant="outline" className="w-10">
          <span>{fontSize}</span>
        </Button>
        <Button variant="outline" onMouseDown={prevent(() => onUpdateSize(-1))}>
          <HugeiconsIcon icon={Icons.MinusSignIcon} />
        </Button>
      </ButtonGroup>
    </div>
  );
}
