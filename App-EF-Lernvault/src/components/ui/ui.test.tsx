import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { cn } from "../../lib/utils";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Input,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Separator,
  Progress,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./index";

describe("shadcn-style Native Design System Components", () => {
  describe("cn utility", () => {
    it("merges classes, handles falsy values and conditional objects", () => {
      expect(cn("px-2", "py-1")).toBe("px-2 py-1");
      expect(cn("font-bold", false && "italic", null, undefined, "text-sm")).toBe("font-bold text-sm");
      expect(cn({ "bg-black": true, "text-white": false, "p-4": true })).toBe("bg-black p-4");
      expect(cn(["a", ["b", { c: true, d: false }]])).toBe("a b c");
    });
  });

  describe("Button component", () => {
    it("renders with various variants and triggers onClick", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Button variant="outline" size="sm" onClick={handleClick}>
          Klausur Starten
        </Button>
      );

      const btn = screen.getByRole("button", { name: "Klausur Starten" });
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveClass("border");

      await user.click(btn);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("prevents clicks when disabled", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Gesperrt
        </Button>
      );

      const btn = screen.getByRole("button", { name: "Gesperrt" });
      expect(btn).toBeDisabled();
      await user.click(btn);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Card compound components", () => {
    it("renders complete hierarchy properly", () => {
      render(
        <Card data-testid="test-card">
          <CardHeader>
            <CardTitle>Wirtschaftspolitik</CardTitle>
            <CardDescription>Magisches Sechseck im Fokus</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Preisniveaustabilität & Vollbeschäftigung</p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Details ansehen</Button>
          </CardFooter>
        </Card>
      );

      expect(screen.getByTestId("test-card")).toBeInTheDocument();
      expect(screen.getByText("Wirtschaftspolitik")).toBeInTheDocument();
      expect(screen.getByText("Magisches Sechseck im Fokus")).toBeInTheDocument();
      expect(screen.getByText("Preisniveaustabilität & Vollbeschäftigung")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Details ansehen" })).toBeInTheDocument();
    });
  });

  describe("Badge component", () => {
    it("renders badge variants correctly", () => {
      render(<Badge variant="outline">AFB II</Badge>);
      const badge = screen.getByText("AFB II");
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass("rounded-full");
    });
  });

  describe("Input component", () => {
    it("handles value change events", async () => {
      const user = userEvent.setup();
      render(<Input placeholder="Suchbegriff eingeben..." />);
      const input = screen.getByPlaceholderText("Suchbegriff eingeben...");
      expect(input).toBeInTheDocument();

      await user.type(input, "Kant Imperativ");
      expect(input).toHaveValue("Kant Imperativ");
    });
  });

  describe("Tabs compound components", () => {
    it("switches tabs and displays active content", async () => {
      const user = userEvent.setup();
      render(
        <Tabs defaultValue="notizen">
          <TabsList>
            <TabsTrigger value="notizen">Notizen</TabsTrigger>
            <TabsTrigger value="karten">Karten</TabsTrigger>
          </TabsList>
          <TabsContent value="notizen">Notizen-Bereich</TabsContent>
          <TabsContent value="karten">Karten-Bereich</TabsContent>
        </Tabs>
      );

      expect(screen.getByText("Notizen-Bereich")).toBeInTheDocument();
      expect(screen.queryByText("Karten-Bereich")).not.toBeInTheDocument();

      const kartenTab = screen.getByRole("tab", { name: "Karten" });
      await user.click(kartenTab);

      expect(screen.queryByText("Notizen-Bereich")).not.toBeInTheDocument();
      expect(screen.getByText("Karten-Bereich")).toBeInTheDocument();
    });
  });

  describe("Dialog component", () => {
    it("opens on trigger click and closes on escape key", async () => {
      const user = userEvent.setup();
      render(
        <Dialog>
          <DialogTrigger>Modal Öffnen</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Klausur-Diagnose</DialogTitle>
              <DialogDescription>D1-D5 Kriterien</DialogDescription>
            </DialogHeader>
            <p>Diagnosebericht...</p>
          </DialogContent>
        </Dialog>
      );

      expect(screen.queryByText("Diagnosebericht...")).not.toBeInTheDocument();

      await user.click(screen.getByText("Modal Öffnen"));
      expect(screen.getByText("Diagnosebericht...")).toBeInTheDocument();

      // 按 ESC 关闭
      fireEvent.keyDown(window, { key: "Escape" });
      expect(screen.queryByText("Diagnosebericht...")).not.toBeInTheDocument();
    });
  });

  describe("Separator component", () => {
    it("renders horizontal and vertical separators", () => {
      const { container } = render(<Separator orientation="horizontal" decorative={false} />);
      expect(container.firstChild).toHaveAttribute("role", "separator");
      const { container: deco } = render(<Separator orientation="vertical" decorative={true} />);
      expect(deco.firstChild).toHaveAttribute("role", "none");
    });
  });

  describe("Progress component", () => {
    it("renders progress bar with capped width percentage", () => {
      render(<Progress value={75} />);
      const bar = screen.getByRole("progressbar");
      expect(bar).toHaveAttribute("aria-valuenow", "75");
    });
  });

  describe("Accordion component", () => {
    it("toggles items open and closed", async () => {
      const user = userEvent.setup();
      render(
        <Accordion defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Frage 1</AccordionTrigger>
            <AccordionContent>Antwort 1 Inhalt</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Frage 2</AccordionTrigger>
            <AccordionContent>Antwort 2 Inhalt</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      // item-1 默认展开
      expect(screen.getByText("Antwort 1 Inhalt")).toBeInTheDocument();
      expect(screen.queryByText("Antwort 2 Inhalt")).not.toBeInTheDocument();

      // 点击展开 item-2
      await user.click(screen.getByText("Frage 2"));
      expect(screen.getByText("Antwort 2 Inhalt")).toBeInTheDocument();
      // single 模式下 item-1 收起
      expect(screen.queryByText("Antwort 1 Inhalt")).not.toBeInTheDocument();
    });
  });
});
