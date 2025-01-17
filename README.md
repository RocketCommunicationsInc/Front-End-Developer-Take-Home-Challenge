# Developer-Take-Home-Challenge

As the next step in the interview process, we’d like you to complete a take home challenge.

**The Project**

Let's assume that _data.json_ contains API responses we want to present to a Ground Resources Management (GRM) operator. Every day, GRM operators work with data similar to what you'll find in the provided JSON file. The task is to create a dashboard presenting data found within the provided JSON file in a clear and intuitive manner.
Please feel free to peruse the Astro UX Design site (https://astrouxds.com/) for ideas or inspiration.

**Requirements**

The data.json file consists of a list of contacts (satellites) and any alerts associated with them configured in a GRM application. Contacts can have properties such as name, status, state, etc. Any alerts the contact has will have the properties errorId, errorSeverity, etc.

- For each alert, I need to know the following:
  - Alert message (_errorMessage_)
  - Contact name (_contactName_)
  - Contact time (_contactBeginTimestamp_ - _contactEndTimestamp_)
- I need to be able to see the details of an alert by clicking on a button called _Show Details_ that utilizes `rux-modal` to show the _contactSatellite_ and _contactDetail_ values
- I need the alerts to be sorted by error time with the most recent at the top (_errorTime_)
- I need to know which alerts I have already acknowledged so that I don’t process the same alert multiple times by mistake. Also once I’ve dealt with an alert, make it clear it’s not something I need to pay attention to again:
- Only unacknowledged alerts can be acknowledged
- Acknowledged alerts cannot be unacknowledged
- Acknowledged alerts must be visually distinct from unacknowledged alerts
- I want to be able to view alerts by their severity as well so that I can prioritize acknowledging the more severe alerts first.

**Technical Requirements**

- This project can be done in any framework of your choice.
- This project should make use of the [Astro component library.](https://astro-components.netlify.app/)
- You are free to use any third-party libraries.
- Please feel free to reach out via email to our recruiter if you have any questions.
- Steps to follow:
  - Fork this repository
  - Work on your solution
  - Create a pull request with @github/cskerbo as the reviewer, if available.
- Have fun and be as creative as you like!

**Timeframe**

We would like the take home challenge to be completed within 5 days. If you need more time, please reach out to us. You will not be judged on how quickly you complete the challenge.
