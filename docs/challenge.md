# Angular-Developer-Take-Home-Challenge

As the next step in the interview process, we’d like you to complete a take home challenge.

**The Project**

Let's assume that *contacts.json* and *alerts.json* contain API responses we want to present to a Ground Resources Management (GRM) operator. Every day, GRM operators work with data similar to what you'll find in the provided JSON files. The task is to create a dashboard presenting data found within the provided JSON files in a clear and intuitive manner.
Please feel free to peruse the Astro UX Design site (https://astrouxds.com/) for ideas or inspiration, but there is no requirement to use Astro or any other Design System.

**Requirements**

The contacts.json file consists of a list of contacts (satellites) configured in a GRM application. Contacts can have properties such as name, status, state, etc. The following should be displayed in the Contacts pane:
- Display the total number of Contacts.
- Display the total different Contact states (*contactState*).
- For each Contact, display Name (*contactName*), Status (*contactStatus*), and Begin/End timestamp (*contactBeginTimestamp/contactEndTimestamp*).
- Allow sorting on the name.

The alerts.json file consists of a list of issues with the contacts. For example, an Alerts panel would provide operators with a roll-up of issues across the board. The following should be displayed in the Alerts pane:
- Display each Alert message (*errorMessage*).
- Display each Alert category (*errorCategory*).
- Display each Alert time (*errorTime*).
- Allow sorting on the category.

**Technical Requirements**
- This project is to be done in Angular. You can use the Angular CLI (https://cli.angular.io/) to quickly create a default Angular project.
- The Angular portion of this challenge is also important for this role. Please consider building/structuring this application as you would any professional Angular application.
- You are free to use any third-party libraries.
- Please feel free to reach out to ask any questions (chris.kerbo@rocketcom.com).
- Steps to follow:
  - Fork this repository
  - Work on your solution
  - Create a pull request with @github/cskerbo as the reviewer.
- Have fun and be as creative as you like!

**Timeframe**

We would like the take home challenge to be completed within 3 days. If you need more time, please reach out to us. You will not be judged on how quickly you complete the challenge.