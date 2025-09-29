// /pages/api/match.js
import puppeteer from "puppeteer";

let matchCache = {};
const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes

export default async function handler(req, res) {
  try {
    const { id } = req.query;

    // Vérifier le cache
    if (matchCache[id] && Date.now() - matchCache[id].time < CACHE_DURATION) {
      return res.status(200).json(matchCache[id].data);
    }

    const url = `https://www.yalla1shoot.com/matches/${id}`;
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const data = await page.evaluate(() => {
      const match = {};

      const team1Logo = document.querySelector(
        "div.MtCard div.backMatch div.McInner div.McTeam:nth-child(1) div.TmFlag"
      )?.getAttribute("data-src");

      const team2Logo = document.querySelector(
        "div.MtCard div.backMatch div.McInner div.McTeam:nth-child(3) div.TmFlag"
      )?.getAttribute("data-src");

      const team1Name = document.querySelector(
        "div.MtCard div.backMatch div.McInner div.McTeam:nth-child(1) div.TmNeam"
      )?.textContent.trim();

      const team2Name = document.querySelector(
        "div.MtCard div.backMatch div.McInner div.McTeam:nth-child(3) div.TmNeam"
      )?.textContent.trim();

      const league = document.querySelector(
        "div.MtCard div.backMatch div.McInner .LgName"
      )?.textContent.trim();

      const score = document.querySelector(
        "div.MtCard div.backMatch div.McInner .McBox"
      )?.textContent.trim();

      const status =
        document.querySelector("div.MtCard div.backMatch div.McInner .McLive")
          ?.textContent.trim() || "not started";

      const iframe = document.querySelector("iframe.video-iframe")?.outerHTML;

      match.team1 = { name: team1Name, logo: team1Logo };
      match.team2 = { name: team2Name, logo: team2Logo };
      match.league = league;
      match.score = score;
      match.status = status;

      return {
        match,
        frame: iframe
          ? iframe
              .replace("data-src", "src")
              .replace('mozallowfullscreen=""', 'sandbox="allow-scripts allow-same-origin"')
          : null,
      };
    });

    await browser.close();

    // Mettre à jour le cache
    matchCache[id] = { data, time: Date.now() };

    res.status(200).json(data);
  } catch (error) {
    console.error("Scraping error:", error);
    res.status(500).json({ error: "Erreur lors du scraping" });
  }
}