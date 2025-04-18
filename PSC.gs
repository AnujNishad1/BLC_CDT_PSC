const API_KEY = 'AIzaSyDbx8NahP3dVS9-HCShINg4cSzGpxZO_tg';

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function checkPageSpeed(url) {
  try {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${API_KEY}`;
    const response = UrlFetchApp.fetch(apiUrl, { muteHttpExceptions: true });
    const text = response.getContentText();
    const json = JSON.parse(text);

    if (json.error) {
      return `❌ API Error: ${json.error.message}`;
    }

    const performance = json.lighthouseResult.categories.performance.score * 100;
    return `✅ PageSpeed Score: ${performance}/100\n🔗 URL: ${url}`;
  } catch (e) {
    return `❌ Exception: ${e.message}`;
  }
}
