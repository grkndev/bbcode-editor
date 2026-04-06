import * as React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import * as Icons from "./Icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { PanelImperativeHandle } from "react-resizable-panels";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
interface HeaderProps {
  onInsertTag: (open: string, close: string) => void;
  onUpdateSize: (delta: number) => void;
  fontSize: number;
  isTagActive: (tag: string) => boolean;
  onInsertAlignTag: (tag: string) => void;
  changePanelLayout: (layout: "left" | "default" | "right") => void;
  rightPanel: React.RefObject<PanelImperativeHandle | null>;
  leftPanel: React.RefObject<PanelImperativeHandle | null>;
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
  changePanelLayout,
  leftPanel,
  rightPanel,
}: HeaderProps) {
  const [imageUri, setImgUri] = React.useState("");
  const [error, setError] = React.useState("");
  const [isDialogOpen, setDialog] = React.useState(false)

  const IMAGE_URL_REGEX =
    /^https?:\/\/([\w-]+\.)+[\w-]+(\/[\w\-./?%&=+#@!~]*)?(\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|avif))(\?[\w\-./?%&=+#@!~]*)?$/i;

  const isValidImageUrl = (url: string) => IMAGE_URL_REGEX.test(url);

  const alignTags = ["left", "center", "right", "justify"];
  return (
    <div className="p-2 flex flex-row justify-between gap-2 border-b">
      <div className="flex flex-row gap-2">
        <ToggleGroup
          type="multiple"
          value={["bold", "italic", "underline", "strikethrough"].filter(
            (t) => {
              const map: Record<string, string> = {
                bold: "b",
                italic: "i",
                underline: "u",
                strikethrough: "s",
              };
              return isTagActive(map[t]);
            },
          )}
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
            onMouseDown={prevent(() => onInsertTag("[*]", ""))}
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

          <Dialog   open={isDialogOpen} onOpenChange={setDialog}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                //onMouseDown={prevent(() => onInsertTag("[img]", "[/img]"))}
              >
                <HugeiconsIcon icon={Icons.Image01Icon} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import image URL</DialogTitle>
                <DialogDescription>
                  Paste the URL which is you want to import to the editor
                </DialogDescription>
              </DialogHeader>

              <Input
                placeholder="https://..."
                value={imageUri}
                onChange={(e) => {
                  setImgUri(e.target.value);
                  setError("");
                }}
                className={error ? "border-red-500" : ""}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}

              <DialogFooter>
                <Button
                  onMouseDown={prevent(() => {
                    if (!isValidImageUrl(imageUri)) {
                      setError("Please enter a valid image URL.");
                      return;
                    }
                    onInsertTag("[img]"+imageUri, "[/img]");
                    setDialog(false);
                    
                  })}
                >
                  Import
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

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
          <Button
            variant="outline"
            onMouseDown={prevent(() => onUpdateSize(1))}
          >
            <HugeiconsIcon icon={Icons.PlusSignIcon} />
          </Button>
          <Button variant="outline" className="w-10">
            <span>{fontSize}</span>
          </Button>
          <Button
            variant="outline"
            onMouseDown={prevent(() => onUpdateSize(-1))}
          >
            <HugeiconsIcon icon={Icons.MinusSignIcon} />
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup>
          <Button
            variant="outline"
            onMouseDown={prevent(() => {
              leftPanel.current?.collapse();
              rightPanel.current?.expand();
            })}
          >
            <HugeiconsIcon icon={Icons.LayoutRightIcon} />
          </Button>
          <Button
            variant="outline"
            onMouseDown={prevent(() => {
              rightPanel.current?.resize("50%");
              leftPanel.current?.resize("50%");
            })}
          >
            <HugeiconsIcon icon={Icons.LayoutTwoColumnIcon} />
          </Button>
          <Button
            variant="outline"
            onMouseDown={prevent(() => {
              rightPanel.current?.collapse();
              leftPanel.current?.expand();
            })}
          >
            <HugeiconsIcon icon={Icons.LayoutLeftIcon} />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
