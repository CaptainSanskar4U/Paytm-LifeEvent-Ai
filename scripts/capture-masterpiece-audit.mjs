import { chromium } from "playwright";
import path from "path";
import fs from "fs";

const SCREENSHOT_DIR = "C:/Users/Captain/.gemini/antigravity/brain/75c9837d-676b-40e2-b3e6-0c5d3ee4d621/screenshots";
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function run() {
  console.log("Starting Masterpiece Visual Verification...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  // 1. Home Desktop Hero
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "master-01-hero-desktop.png"), fullPage: false });
  console.log("Captured master-01-hero-desktop.png");

  // 2. Crisis Ledger
  const ledger = page.locator("text=[ 01 // CRISIS RESPONSE ARCHITECTURE ]").first();
  await ledger.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "master-02-crisis-ledger.png"), fullPage: false });
  console.log("Captured master-02-crisis-ledger.png");

  // 3. Journey Simulator with Multi-Node Coordination
  const sim = page.locator("text=Signature Architecture // Dynamic Financial Graph").first();
  if (await sim.isVisible()) {
    await sim.scrollIntoViewIfNeeded();
  } else {
    const sim2 = page.locator("text=[ 02 // SIGNATURE ARCHITECTURE").first();
    await sim2.scrollIntoViewIfNeeded();
  }
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "master-03-journey-simulator.png"), fullPage: false });
  console.log("Captured master-03-journey-simulator.png");

  // 4. Evidence Trap Inspector with Trap Activated
  const trapSec = page.locator("text=[ 03 // ZERO-HALLUCINATION DEFENSE ]").first();
  await trapSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  // Click the trap button to demonstrate defense
  const trapBtn = page.locator("button:has-text('INJECT FAKE EXCLUSION TRAP')").first();
  if (await trapBtn.isVisible()) {
    await trapBtn.click();
    await page.waitForTimeout(600);
  }
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "master-04-trap-neutralized.png"), fullPage: false });
  console.log("Captured master-04-trap-neutralized.png");

  // 5. Paytm Bridge Showcase
  const paytmSec = page.locator("text=[ 04 // PAYTM EMERGENCY LIQUIDITY RAIL ]").first();
  await paytmSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "master-05-paytm-bridge.png"), fullPage: false });
  console.log("Captured master-05-paytm-bridge.png");

  // 6. Hospital Console Preview
  const hospSec = page.locator("text=[ 05 // INSTITUTIONAL SAAS COCKPIT ]").first();
  await hospSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "master-06-hospital-console.png"), fullPage: false });
  console.log("Captured master-06-hospital-console.png");

  // 7. Hackathon Judge Matrix & Launchpad
  const launchpadSec = page.locator("text=Why LifeEvent AI is fundamentally different.").first();
  await launchpadSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "master-07-differentiation-matrix.png"), fullPage: false });
  console.log("Captured master-07-differentiation-matrix.png");

  // Multi-viewport verification:
  // Tablet (768px)
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "master-08-tablet-768.png"), fullPage: false });
  console.log("Captured master-08-tablet-768.png");

  // Mobile (390px)
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "master-09-mobile-390.png"), fullPage: false });
  console.log("Captured master-09-mobile-390.png");

  await browser.close();
  console.log("All masterpiece verification screenshots captured successfully!");
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
