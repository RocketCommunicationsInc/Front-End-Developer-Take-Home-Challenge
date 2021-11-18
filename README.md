# Developer-Take-Home-Challenge

As the next step in the interview process, we’d like you to complete a take home challenge.

**The Project**

Let's assume that _data.json_ contains API responses we want to present to a Ground Resources Management (GRM) operator. Every day, GRM operators work with data similar to what you'll find in the provided JSON file. The task is to create a dashboard presenting data found within the provided JSON file in a clear and intuitive manner.
Please feel free to peruse the Astro UX Design site (https://astrouxds.com/) for ideas or inspiration.

**Requirements**

The data.json file consists of a list of contacts (satellites) and any alerts associated with them configured in a GRM application. Contacts can have properties such as name, status, state, etc. Any alerts the contact has will have the properties errorId, errorSeverity, ect. The following should be displayed:

- For each alert, display the following:
  - Alert message (_errorMessage_)
  - Contact name (_contactName_)
  - Contact time (_contactBeginTimestamp_ - _contactEndTimestamp_)
- Each alert should have a _Show Details_ option that utilizes `rux-modal` to show the _contactSatellite_ and _contactDetail_ values
- Alerts should be sorted by error time (_errorTime_)

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

**Tom's Notes**

There a couple of unique key errors for some of the errorIds, which is surprising. I decided to leave these the way they are and not change the data. I'm guessing maybe somebody duplicated the items and forgot to change the IDs to be unique.

I originally had the rows mapped to the contacts and its alerts to one column, but I changed my approach to map to the alerts as the main object.
