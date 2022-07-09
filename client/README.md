## GRM Dashboard

Author: Greg Petropoulos

## Intro 
Front End Developer-Challenge
The task is to create a dashboard presenting contacts and alerts data found within the provided JSON file in a clear and intuitive manner. 
## Plan
- Fork Repo and clone to local machine
- Create a branch
- Set up a React app and add deps
- Commit changes 
- My Theme is based off John Glenn' Friendship 7 space craft.
- Start building out the dashboard UI based off the Astro UX Design site (https://astrouxds.com/)
- Handle the UX requirements listed
- Refactor code and test


## Challenges
- `RuxModal` caused issues being able to open and close without state. Once I added the state the issue was resolved
- `data.json` has an alerts array nested. 

## Execution
I am using React as my JS framework and created a React app with `npx create-react-app` and installed the Astro and Tailwind deps. To handle the addtional git subfolder created during the create-react-app command
- Step 1 cd client
- Step 2 rm -rf .git 
- Step 3 cd ..     go  back to root folder 
- Step 4 add the .gitignore into the root folder 

 Next, I perused the documentation and design standards to get a sense of expectatons. I started with breaking down the dashboard into three components `Navbar`, `Alerts`, and `Contacts`. 

 The `Navbar` component has a simple clock, app-name, app-username, and app-domain

 The `Alerts` component shows the Total Alerts and a table of all the data with alerts. Each alert has an Alert Message, Contact Name, Contact Time, and Show Details button. The Show Details button will open a modal and show more details regarding the alert such as Contact Details and Contact Satellite. The state is tracking when the modal is open and closed.

 `Select Box` for the severity levels I created a dropdown select box to choose one of three options `Critical`, `Serious`, and `Caution`. 

 When alerts are acknowledged by a checkbox the corresponding alert row will turn green and the Unack' Alerts will update. Once acknowledged the alert the checkbox is disabled. The state is tracking the checked box and the 'selected' key. The selected key will become true if the checkbox is ticked and it will remain true as the controller for being acknowledged. 
