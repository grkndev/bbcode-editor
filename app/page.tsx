import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export default function Home() {
  return (
    <div className="p-1">
      <ButtonGroup aria-label="Button group">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </ButtonGroup>
    </div>
  );
}
