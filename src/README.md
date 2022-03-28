**INSTRUCTIONS**
- clone/branch and run npm install



**The Project**
[1] The idea was to mimic a similar style to the GRM Dashboard https://www.astrouxds.com/grm-service-ux-design/grm-dashboard/
[2] My goal was to incorporate as many AstroUXDS components as possible. I went ahead and took a top down design approach to cleanly funnel data through all the components.
[3]Below I will go through each component and issues experienced and how I planned to tackle some requirements that were left unmet along with any additional notes.

**APP**


**Header**
# issues
- The main issue that I wanted to revisit is the cropping of the monitoring icons.
Potential solution may be exploring the customization options to expand the containers, if any, for the icons.

**Log**
# notes
- Log contains most of functionality to the project.
# issues
- Rendering the table header in the format I would've liked.
- Header cells are not aligned properly
- Adding overflow scroll to integrate cleanly into RuxTableBody. The bar currently affects the header as well as the table rows.
- styling issue with the RuxTable filling the available space.

**Row**

# notes
- I nested the Modal component in hopes to efficiently pass down data and render depending on the same state.

# issues
- slow rendering, complication, when opening Modal 
- data in Rows is not properly aligned or formatted
- error message needs to be generated
- filtering of data to prioritize severity and objects that actually contain alerts.
- rendering a modal with alert data if any.

**Modal**

# notes
- styling issue caused when nesting Modal in Row addressed in pertaining stylesheet
- data has not been passed down to reflect the expected message/alert