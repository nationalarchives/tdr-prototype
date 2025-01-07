---
status:
  colour: "blue"
  title: "In progress"
title: "[Metadata Review] Department user-facing and TNA user-facing"
date_started: "2024-05-02"
date_completed: ""
issues:
  - id: "TUX-34"
    url: "https://national-archives.atlassian.net/browse/TUX-34"
confluence_pages:
---

### Motivations & Context

In the HDD journey, there is a back-and-forth support cycle between Digital Transfer Advisors (DTAs) and users to ensure that certain metadata is present and no obvious issues are present that won't be picked up by TDR error checks. Now that the user is asked to fill in a spreadsheet of metadata (a very similar task to the HDD journey) there is a higher likelihood of entry errors but currently without DTA support. A lot of technical errors will be picked up by the error cycle within TDR but not all metadata issues can be. 

Internal motivations come from a need to improve the accuracy of metadata to avoid interventions downstream. 

User-driven motivations come from the need to support a more complex data entry task.

### Design changes

The up-front service design work is available on this [Lucid board](https://lucid.app/lucidspark/1f4fa79e-6ef7-4c08-9926-4267a74be58d/edit?view_items=YbXxV28h6eDk&invitationId=inv_4fc166d0-78a2-41fd-9dd0-d512728369fe). 

This explains how the users and DTAs will interact, often leaving the application for long periods and entering into email communication back and forth. 

The user-facing designs are currently quite simple. These include:  
1. a _Request a review_ page
2. a _Review in progress_ page 
3. a _Review completed with errors_ page
4. a _Review completed success_ page

Pages 2, 3 and 4 are all effectively the same but in different states. 

Other considerations:  
- How the user returns to the Review page after leaving TDR
- The emails being sent to the user at different points in the journey
