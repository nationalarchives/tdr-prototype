---
status:
  colour: "grey"
  title: "Superseded"
title: "Resuming an in-progress transfer (Closure metadata)"
date_started: "2023-09-01"
date_completed: "2023-09-25"
issues:
  - id: "TDR-3301"
    url: "https://national-archives.atlassian.net/browse/TDR-3301"
confluence_pages:
---

**Superceded by:<br>
 _[Resuming an in-progress review (Composite)]()_**

### Motivations & Context

Post public beta the focus for TDR is working toward allowing large volumes of metadata to be added. Currently, this is a difficult task when entering files one by one in the UI. Some of this work has been informed or motivated by the [workshop in June 2023](https://national-archives.atlassian.net/wiki/spaces/DA/pages/86933537). There is also a co-design workshop being held to validate some of the early designs.

### Design changes

- Changing the conceptual model for TDR journey from linear to 'hub and spoke'
- Using the GDS task list pattern (soon to be a component)
- Adding the user journeys for uploading CSV
- Gradually adding the failure/error paths for CSV upload.
- Various other updates to the design according to the needs of the new model
