---
status:
  colour: "blue"
  title: "Superseded"
title: "[Metadata upload - Functional] User is informed their metadata upload has failed"
date_started: "2024-03-05"
date_completed: ""
issues:
  - id: "TUX-12"
    url: "https://national-archives.atlassian.net/browse/TUX-12"
confluence_pages:
---

_**SUPERSEDED BY**_:<br>
[[Metadata Upload] Core journey & guidance](/prototype-version/13)

### Motivations & Context

When the user uploads a metadata file that fails upload on any of three accounts:  
- File type isn't a CSV
- Checksum (corrupted file)
- Virus detected

File type checking has previously been done on client and server. On client there was a file extension check with JS. In this case potentially avoid that by specifying the mime type in the ['accept' HTML parameter](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers).


### Design changes

**Fail type 1: Selected a file other than a CSV**  

The [`input[type=file]` element has an 'accept' param](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers)  in which you can specify a mime type ("text/csv") and this prevents anything other than a CSV from being selected. This may negate the need for an extension check using JS and therefore an error on the upload page itself.

**Fail type 2: After CSV has been uploaded - Virus or checksum**  

After the file has hit the server and we've found a virus or a checksum error. A page shows whilst the server-side processing happens and when prompted the user navigates to a results page with fail information.
