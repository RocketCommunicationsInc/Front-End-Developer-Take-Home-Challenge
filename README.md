# Developer-Take-Home-Challenge

As the next step in the interview process, we’d like you to complete a take home challenge.

**The Project**

Let's assume that _contacts.json_ and _alerts.json_ contain API responses we want to present to a Ground Resources Management (GRM) operator. Every day, GRM operators work with data similar to what you'll find in the provided JSON files. The task is to create a dashboard presenting data found within the provided JSON files in a clear and intuitive manner.
Please feel free to peruse the Astro UX Design site (https://astrouxds.com/) for ideas or inspiration, but there is no requirement to use Astro or any other Design System.

**Requirements**

The contacts.json file consists of a list of contacts (satellites) configured in a GRM application. Contacts can have properties such as name, status, state, etc. The following should be displayed in the Contacts pane:

- Display the total number of Contacts.
- Display the total different Contact states (_contactState_).
- For each Contact, display Name (_contactName_), Status (_contactStatus_), and Begin/End timestamp (_contactBeginTimestamp/contactEndTimestamp_).
- Allow sorting on the name.

The alerts.json file consists of a list of issues with the contacts. For example, an Alerts panel would provide operators with a roll-up of issues across the board. The following should be displayed in the Alerts pane:

- Display each Alert message (_errorMessage_).
- Display each Alert category (_errorCategory_).
- Display each Alert time (_errorTime_).
- Allow sorting on the category.

**Technical Requirements**

- This project can be done in any framework of your choice.
- This project should make use of the Astro Stencil component library. (https://astro-components.netlify.app/)
- You are free to use any third-party libraries.
- Please feel free to reach out to ask any questions (jeremy.benson@rocketcom.com).
- Steps to follow:
  - Fork this repository
  - Work on your solution
  - Create a pull request with @github/rocket-bensonism as the reviewer.
- Have fun and be as creative as you like!

**Timeframe**

We would like the take home challenge to be completed within 3 days. If you need more time, please reach out to us. You will not be judged on how quickly you complete the challenge.

// REMOVE THIS MICAH
Includes Fetch Data and Display - we should include some kind of data transformation

Alter the structure ideas:

- Add something for them to remove in the json?
- Create a new, filtered object from one of the given jsons
-

Concatenate a label ideas:

- Concatenate contactName and contactStep?
- Concatenate severity and category ( alerts ), turn into new key/value pair in json

Take both table data formats into a single json and then separate ideas:

- Combine the 2 json files into single, display something
