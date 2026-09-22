import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
  try {
    localStorage.clear();
  } catch {
    // jsdom ohne storage: ignorieren
  }
});
