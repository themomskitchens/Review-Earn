function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  const action = e.parameter.action;

  if (action === "getUser") {
    const mobile = e.parameter.mobile;
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][2] == mobile) {
        return ContentService.createTextOutput(JSON.stringify({
          totalPoints: data[i][6]
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }
    return ContentService.createTextOutput(JSON.stringify({ error: "User not found" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (action === "rewards") {
    const rewards = [
      { reward: "Free Drink", description: "Get 1 cold drink free!", points: 50, image: "https://i.imgur.com/1r7xG8n.png" },
      { reward: "Free Snack", description: "Free Namkeen worth ₹30", points: 100, image: "https://i.imgur.com/K6bUu7L.png" },
      { reward: "₹100 Off", description: "On your next meal order", points: 200, image: "https://i.imgur.com/fvvK4Sf.png" },
    ];
    return ContentService.createTextOutput(JSON.stringify(rewards))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  const data = JSON.parse(e.postData.contents);
  const ts = new Date();

  if (data.type === "review") {
    sheet.appendRow([ts, data.name, data.mobile, data.screenshot, "Pending", 50, ""]);
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput(JSON.stringify({ error: "Invalid request" }))
    .setMimeType(ContentService.MimeType.JSON);
}
