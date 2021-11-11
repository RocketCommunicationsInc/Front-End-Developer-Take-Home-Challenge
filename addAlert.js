const alerts = require("./alerts.json");
const contacts = require("./contacts.json");
const fs = require("fs");

function addAlertsToContacts(alerts, contacts) {
  // Add alert array as a field, and add actual alert data arbiturally through out contacts
  let count = alerts.length - 1;
  let allAlertsUsed = false;
  contacts.forEach((item) => {
    item.alerts = [];
    if (
      count > 0 &&
      contacts.indexOf(item) % Math.floor(Math.random() * 10) === 0
    ) {
      item.alerts.push(alerts[count]);
      count--;
    } else {
      if (count <= 0) allAlertsUsed = true;
    }
  });
  console.log(`All alerts used: ${allAlertsUsed}`);
  fs.writeFile("data.json", JSON.stringify(contacts), "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
  });
}

addAlertsToContacts(alerts, contacts);
