/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

module.exports = {

  // Insert values here
  foi_exemption_codes: [
    "27(1)", "27(2)", "31", "33", "36", "38(1a)", "38(1b)",  "38(2)", "40(2)", "43(1)", "43(2)", "---------", "22", "22A", "23", "24", "23/24 – In the alternative", "26", "27(1)", "27(2)", "28", "29", "32", "34", "35", "37(1)(a)", "37(1)(aa)", "37(1)(ab)", "37(1)(ac)", "37(1)(ad)", "37(1)(b)", "37(2)", "39", "40", "41", "42", "43(1)", "43(2)", "44", "---------", "EIRs 12(3) & 13", "EIRs 12(5)(a)", "EIRs 12(5)(b)", "EIRs 12(5)(c)", "EIRs 12(5)(d)", "EIRs 12(5)(e)", "EIRs 12(5)(f)", "EIRs 12(5)(g)"
  ]
}
