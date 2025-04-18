function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function checkLinks(url) {
  try {
    var html = UrlFetchApp.fetch(url).getContentText();
    var matches = [...html.matchAll(/<a[^>]+href=["']([^"']+)["']/g)];
    var results = [];

    for (var match of matches) {
      var link = match[1];
      if (!link.startsWith("http")) {
        continue; // skip relative or mailto links
      }
      try {
        var response = UrlFetchApp.fetch(link, {muteHttpExceptions: true});
        var code = response.getResponseCode();
        results.push({
          url: link,
          status: code,
          ok: code === 200
        });
      } catch (err) {
        results.push({
          url: link,
          status: "Error",
          ok: false
        });
      }
    }

    return results;
  } catch (err) {
    return [{url: url, status: "Invalid URL or Fetch Failed", ok: false}];
  }
}
