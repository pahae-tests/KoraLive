// /pages/api/scrape.js
import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();

    await page.goto('https://www.yalla1shoot.com/matches-today_2', { waitUntil: 'networkidle2' });
    await page.waitForSelector('#ayala-today > div'); // attendre que les matchs apparaissent

    const matches = await page.evaluate(() => {
      const matchDivs = document.querySelectorAll('#ayala-today > div');
      const result = [];

      matchDivs.forEach((el, i) => {
        const team1Logo = el.querySelector('.AY_Inner .MT_Team.TM1 .TM_Logo img')?.getAttribute('data-src') || '';
        const team1Name = el.querySelector('.AY_Inner .MT_Team.TM1 .TM_Name')?.textContent.trim() || '';

        const team2Logo = el.querySelector('.AY_Inner .MT_Team.TM2 .TM_Logo img')?.getAttribute('data-src') || '';
        const team2Name = el.querySelector('.AY_Inner .MT_Team.TM2 .TM_Name')?.textContent.trim() || '';
        
        const ti = el.querySelector('.AY_Inner .MT_Data .MT_Time')?.textContent.trim() || '';
        const time1 = Number(ti.split(":")[0]);
        const time2 = ti.split(":")[1];
        const time = (time1 >= 2 ? time1 - 2 : 12 + time1 - 2) + ":" + time2;
        const scoreSpans = el.querySelectorAll('.AY_Inner .MT_Data .MT_Result span');
        const score = scoreSpans.length >= 3
          ? `${scoreSpans[0].textContent.trim()} - ${scoreSpans[2].textContent.trim()}`
          : 'Not started yet';

        const status = el.querySelector('.AY_Inner .MT_Data .MT_Stat')?.textContent.trim().toLowerCase() || 'upcoming';
        const league = el.querySelector('.MT_Info ul li:nth-child(3) span')?.textContent.split(',')[1].trim() || '';
        const href = el.querySelector('a')?.getAttribute('href') || '';
        const idMatch = href.split('matches/')[1].replace('/', '') || `${i}`;

        result.push({
          _id: idMatch,
          team1: { name: team1Name, logo: team1Logo },
          team2: { name: team2Name, logo: team2Logo },
          time,
          score,
          status,
          league
        });
      });

      return result;
    });

    await browser.close();

    res.status(200).json({ matches });
  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({ error: 'Erreur lors du scraping' });
  }
}