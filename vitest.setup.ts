import "@testing-library/jest-dom/vitest";
// vitest-axe/extend-expect provides the TypeScript type augmentation for
// toHaveNoViolations; the explicit expect.extend call registers the matcher
// at runtime (the dist/extend-expect.js file is empty in the installed version).
import "vitest-axe/extend-expect";
import * as axeMatchers from "vitest-axe/matchers";
import { expect } from "vitest";
expect.extend(axeMatchers);
