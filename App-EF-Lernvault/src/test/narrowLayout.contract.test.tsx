import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { ONBOARDING_STORAGE_KEY } from "../engine/storageKeys";
import App from "../App";

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem(
    ONBOARDING_STORAGE_KEY,
    JSON.stringify({
      version: 1,
      done: true,
      faecher: ["SoWi"],
      klausurDate: "2027-06-30",
      demo: false,
    })
  );
  window.history.replaceState({}, "", "/?tab=library");
});

describe("narrow-window layout structure", () => {
  it("collapses both navigation columns before xl and keeps the reading panel bounded", async () => {
    const { container } = render(<App />);
    await screen.findByText(/Alle \(\d+\)/);

    const shellSidebar = container.querySelector("aside");
    expect(shellSidebar).not.toBeNull();
    const workspace = shellSidebar!.nextElementSibling;
    expect(workspace?.tagName).toBe("MAIN");
    expect(shellSidebar!.parentElement).toBe(workspace!.parentElement);
    expect(shellSidebar).toHaveClass("w-16", "shrink-0", "xl:w-60");

    const viewport = Array.from(workspace!.children).find((element) =>
      element.classList.contains("tab-enter")
    );
    expect(viewport).toBeDefined();
    expect(viewport).toHaveClass("min-w-0", "overflow-y-auto", "p-4", "sm:p-6", "xl:p-8");

    const libraryShell = viewport!.firstElementChild;
    expect(libraryShell).toHaveClass("flex", "flex-col", "xl:flex-row");
    const librarySidebar = libraryShell!.firstElementChild;
    const readingColumn = librarySidebar!.nextElementSibling;
    expect(librarySidebar).toHaveClass("w-full", "shrink-0", "xl:w-80");
    expect(readingColumn).toHaveClass("flex-1", "min-w-0");

    const readingPanel = readingColumn!.firstElementChild;
    expect(readingPanel).toHaveClass("max-w-[46rem]", "p-5", "sm:p-8");
    expect(readingPanel!.querySelector("article")).not.toBeNull();
  });
});
