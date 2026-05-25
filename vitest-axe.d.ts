// Type augmentation for vitest-axe's toHaveNoViolations matcher.
// vitest-axe's bundled extend-expect.d.ts targets the old Vi.Assertion namespace
// which no longer exists in Vitest 4. This file re-declares the matcher against
// the current vitest module interface instead.
import "vitest";

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Assertion<T> {
    toHaveNoViolations(): void;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
  }
}
