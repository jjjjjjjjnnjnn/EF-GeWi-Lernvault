import { describe, it, expect, beforeEach } from "vitest";
import { MasteryEngine } from "./mastery";

describe("MasteryEngine & BKT Model", () => {
  let engine: MasteryEngine;

  beforeEach(() => {
    engine = new MasteryEngine();
    engine.clearAll();
  });

  it("initializes with default prior and increases mastery on consecutive correct answers", () => {
    const topicId = "sowi-ungleichheit";
    const m1 = engine.recordAttempt(topicId, "Soziale Ungleichheit", "SoWi", true, ["Gesellschaft"]);
    expect(m1.pMastery).toBeGreaterThan(0.15); // > pL0
    expect(m1.totalAttempts).toBe(1);
    expect(m1.correctAttempts).toBe(1);

    const m2 = engine.recordAttempt(topicId, "Soziale Ungleichheit", "SoWi", true, ["Gesellschaft"]);
    expect(m2.pMastery).toBeGreaterThan(m1.pMastery);

    const m3 = engine.recordAttempt(topicId, "Soziale Ungleichheit", "SoWi", true, ["Gesellschaft"]);
    expect(m3.pMastery).toBeGreaterThan(m2.pMastery);
  });

  it("decreases mastery on incorrect response", () => {
    const topicId = "philo-kant";
    const m1 = engine.recordAttempt(topicId, "Kant Pflichtethik", "Philosophie", true, ["Ethik"]);
    const highMastery = m1.pMastery;

    const m2 = engine.recordAttempt(topicId, "Kant Pflichtethik", "Philosophie", false, ["Ethik"]);
    expect(m2.pMastery).toBeLessThan(highMastery);
    expect(m2.totalAttempts).toBe(2);
    expect(m2.correctAttempts).toBe(1);
  });

  it("correctly computes Inhaltsfeld statistics and identifies weak topics", () => {
    engine.recordAttempt("t1", "Marktwirtschaft Ordnung", "SoWi", false, ["Wirtschaft"]);
    engine.recordAttempt("t2", "Soziale Ungleichheit", "SoWi", true, ["Gesellschaft"]);
    engine.recordAttempt("t2", "Soziale Ungleichheit", "SoWi", true, ["Gesellschaft"]);
    engine.recordAttempt("t2", "Soziale Ungleichheit", "SoWi", true, ["Gesellschaft"]);

    const weak = engine.getWeakestTopics(1, "SoWi");
    expect(weak).toHaveLength(1);
    expect(weak[0].topicId).toBe("t1");

    const ifStats = engine.getInhaltsfeldStats("SoWi");
    expect(ifStats.length).toBeGreaterThan(0);
    const if1 = ifStats.find((s) => s.inhaltsfeld.code === "IF 1");
    expect(if1?.status).toBe("weak");
  });

  it("supports user-controlled semester mode (EF.1 / EF.2) with independent states and archives", () => {
    expect(engine.isTermModeEnabled()).toBe(false);
    expect(engine.getEffectiveTerm()).toBe("ALL");

    // Enable term mode
    engine.setTermModeEnabled(true);
    expect(engine.isTermModeEnabled()).toBe(true);
    expect(engine.getActiveTerm()).toBe("EF.1");

    // Record attempt in EF.1
    engine.recordAttempt("sowi-ef1-topic", "Marktversagen", "SoWi", true, ["Wirtschaft"]);
    expect(engine.getTopicMastery("sowi-ef1-topic")).not.toBeNull();

    // Switch to EF.2
    engine.setActiveTerm("EF.2");
    expect(engine.getTopicMastery("sowi-ef1-topic")).toBeNull(); // isolated in EF.1

    // Archive EF.2 then reset
    engine.recordAttempt("sowi-ef2-topic", "Sozialstaat", "SoWi", true, ["Gesellschaft"]);
    const archive = engine.archiveCurrentTerm();
    expect(archive.term).toBe("EF.2");
    expect(archive.snapshot["sowi-ef2-topic"]).toBeDefined();

    // Reset EF.2
    engine.resetCurrentTerm();
    expect(engine.getTopicMastery("sowi-ef2-topic")).toBeNull();

    // Switch back to EF.1 and verify data persists
    engine.setActiveTerm("EF.1");
    expect(engine.getTopicMastery("sowi-ef1-topic")).not.toBeNull();

    // Turn off term mode
    engine.setTermModeEnabled(false);
    expect(engine.getEffectiveTerm()).toBe("ALL");
  });
});
