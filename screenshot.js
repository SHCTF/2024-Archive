const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 14500, height: 2240 });

  // 打开目标网页
  await page.goto('https://shc.tf/games/1/scoreboard');

  // 等待一个特定的网络请求完成（例如：请求数据接口 '/api/data' 返回 200 状态码）
  await page.waitForResponse(response => 
    response.url().includes('/api/game/1/scoreboard') && response.status() === 200);
  await page.waitForLoadState('networkidle');

  // 截图保存
  await page.screenshot({ path: 'scoreboard_screenshot.png' });

  await browser.close();
})();
