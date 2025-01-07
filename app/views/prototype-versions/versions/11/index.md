---
status:
  colour: "green"
  title: "Complete"
title: "[Metadata upload - Functional] Closed record status confirmation & metadata summary"
date_started: "2024-03-06"
date_completed: ""
issues:
  - id: "TUX-24"
    url: "https://national-archives.atlassian.net/browse/TUX-24"
confluence_pages:
---

HIS WORK HAS BEEN CONTINUED IN:  
[[Metadata Upload] Core journey & guidance](???)

### Motivations & Context


In the manual/UI metadata entry journey, users are asked to confirm closure status file by file. When uploading a CSV this option is never presented.  

Therefore we're asking the user to only confirm once for all closed records.

Options considered:
- Beginning or end of journey?
- Positive: We see you've added closure? Confirm please.
- Negative: We see you've not added closure? Confirm pls
- Both of the above two options

---

This also contains the work for showing the user a summary of metadata.

### Design changes

- Page is positioned after metadata upload. 
- Version 1: Separate page for confirmation after 'Results of your CSV checks'
- Version 2: Incorporating confirmation into 'Results of your CSV checks'

V2 is more concise but not as explicit. Goes against the "one thing per page approach".

---

In version 3 the summary of metadata includes a GDS Summary List on the page, which was previously the Download and Review metadata page.
