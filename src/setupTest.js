import matchers from "@testing-library/jest-dom/matchers";
import axios from "axios";
import { expect, vi } from "vitest";
expect.extend(matchers);
vi.mock("axios");

axios.create.mockImplementation((config) => axios);
axios.interceptors.request.use.mockImplementation();

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});
