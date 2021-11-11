# Developer-Take-Home-Challenge

As the next step in the interview process, we’d like you to complete a take home challenge.

**The Project**

Let's assume that _data.json_ contains API responses we want to present to a Ground Resources Management (GRM) operator. Every day, GRM operators work with data similar to what you'll find in the provided JSON file. The task is to create a dashboard presenting data found within the provided JSON file in a clear and intuitive manner.
Please feel free to peruse the Astro UX Design site (https://astrouxds.com/) for ideas or inspiration.

**Requirements**

The data.json file consists of a list of contacts (satellites) and any alerts associated with them configured in a GRM application. Contacts can have properties such as name, status, state, etc. Any alerts the contact has will have the properties errorId, errorSeverity, ect. The following should be displayed:

- Display the total number of Contacts.
- Display the total different Contact states (_contactState_).
- For each Contact, display Name (_contactName_), Status (_contactStatus_), and Begin/End timestamp (_contactBeginTimestamp/contactEndTimestamp_).
- For each Contact with alerts:
  - Display each Alert message (_errorMessage_).
  - Display each Alert category (_errorCategory_) concatenated with the Alert severity (_errorSeverity_).
  - Display each Alert time (_errorTime_).

**Technical Requirements**

- This project can be done in any framework of your choice.
- This project should make use of the [Astro component library.](https://astro-components.netlify.app/)
- You are free to use any third-party libraries.
- Please feel free to reach out to ask any questions (jeremy.benson@rocketcom.com).
- Steps to follow:
  - Fork this repository
  - Work on your solution
  - Create a pull request with @github/rocket-bensonism as the reviewer.
- Have fun and be as creative as you like!

**Timeframe**

We would like the take home challenge to be completed within 3 days. If you need more time, please reach out to us. You will not be judged on how quickly you complete the challenge.
