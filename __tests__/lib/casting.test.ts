import { describe, it, expect } from "vitest";
import { SAMPLE_OPPORTUNITIES, SAG_PIPELINE_STEPS, AGENCY_RESEARCH_MARKETS } from "@/lib/casting";
import { CASTING_SPLIT } from "@/lib/splits";

describe("SAMPLE_OPPORTUNITIES", () => {
  it("has at least 5 opportunities", () => {
    expect(SAMPLE_OPPORTUNITIES.length).toBeGreaterThanOrEqual(5);
  });

  it("includes SAG and non-SAG opportunities", () => {
    const sagCount = SAMPLE_OPPORTUNITIES.filter((o) => o.isSag).length;
    const nonSagCount = SAMPLE_OPPORTUNITIES.filter((o) => !o.isSag).length;
    expect(sagCount).toBeGreaterThan(0);
    expect(nonSagCount).toBeGreaterThan(0);
  });

  it("each opportunity has required fields", () => {
    SAMPLE_OPPORTUNITIES.forEach((opp) => {
      expect(opp.id).toBeTruthy();
      expect(opp.title).toBeTruthy();
      expect(opp.location).toBeTruthy();
      expect(opp.agency).toBeTruthy();
      expect(opp.requirements.length).toBeGreaterThan(0);
    });
  });

  it("includes multiple opportunity types", () => {
    const types = new Set(SAMPLE_OPPORTUNITIES.map((o) => o.type));
    expect(types.size).toBeGreaterThan(3);
  });
});

describe("SAG_PIPELINE_STEPS", () => {
  it("has 10 steps", () => {
    expect(SAG_PIPELINE_STEPS).toHaveLength(10);
  });

  it("each step starts uncompleted", () => {
    SAG_PIPELINE_STEPS.forEach((s) => expect(s.completed).toBe(false));
  });

  it("each step has resources", () => {
    SAG_PIPELINE_STEPS.forEach((s) => expect(s.resources.length).toBeGreaterThan(0));
  });
});

describe("AGENCY_RESEARCH_MARKETS", () => {
  it("includes key cities", () => {
    expect(AGENCY_RESEARCH_MARKETS).toContain("Los Angeles");
    expect(AGENCY_RESEARCH_MARKETS).toContain("New York");
    expect(AGENCY_RESEARCH_MARKETS).toContain("Atlanta");
    expect(AGENCY_RESEARCH_MARKETS).toContain("Miami");
    expect(AGENCY_RESEARCH_MARKETS).toContain("Paris");
  });
});

describe("CASTING_SPLIT", () => {
  it("is 64/36", () => {
    expect(CASTING_SPLIT.performer).toBe(64);
    expect(CASTING_SPLIT.platform).toBe(36);
  });
});
