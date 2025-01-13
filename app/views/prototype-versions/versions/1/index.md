---
status:
  colour: "grey"
  title: "Abandoned"
title: "Manipulate large volumes of metadata"
date_started: "2023-09-01"
date_completed: ""
clear_session_url: "https://tdr-prototyp-tdr-2677-m-jqwt8o.herokuapp.com/prototype-versions/clear-data"
issues:
  - id: "TDR-2677"
    url: "https://national-archives.atlassian.net/browse/TDR-2677"
confluence_pages:
  - title: Sprint 93 - User wants to manipulate metadata for a large volume of files
    url: https://national-archives.atlassian.net/wiki/spaces/DA/pages/136675329
---

**UPDATE Aug 2024: The idea of changing the linear TDR model to a hub/spoke 'task list' originated here. See the more recent work (Aug 2024 onwards) on integrating the task list with metadata upload:**<br>[Task List for Metadata Upload](/prototype-version/17)

### Motivations & Context

Post public beta the focus for TDR is working toward allowing large volumes of metadata to be added. Currently, this is a difficult task when entering files one by one in the UI. Some of this work has been informed or motivated by the [workshop in June 2023](https://national-archives.atlassian.net/wiki/spaces/DA/pages/86933537). There is also a co-design workshop being held to validate some of the early designs.

### Design changes

- Changing the conceptual model for TDR journey from linear to 'hub and spoke'
- Using the GDS task list pattern (soon to be a component)
- Adding the user journeys for uploading CSV
- Gradually adding the failure/error paths for CSV upload.
- Various other updates to the design according to the needs of the new model
