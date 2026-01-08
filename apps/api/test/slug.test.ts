import { describe, expect, it } from "vitest";
import { slugSchema } from "@digitalmenu/shared";

describe("slugSchema", () => {
  it("normalizes and validates slugs", () => {
    const result = slugSchema.parse("My-Restaurant");
    expect(result).toBe("my-restaurant");
  });

  it("rejects invalid slugs", () => {
    expect(() => slugSchema.parse("Invalid Slug" as string)).toThrow();
  });
});
