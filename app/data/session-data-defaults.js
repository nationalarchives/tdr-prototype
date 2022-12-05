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
  creating_bodies: [
    "Department of Cake",
    "Department of Pasta",
    "Department of Wines and Spirits",
    "Department of Dairy",
    "Department of Vegetables and Fruits",
  ],
  files: [
    {
      name: "baking powder.xls",
      type: "item",
      id: 0,
    },
    {
      name: "cocoa.xlsx",
      children: [],
      type: "item",
      id: 1,
    },
    {
      name: "flour.xlsx",
      children: [],
      type: "item",
      id: 2,
    },
    {
      name: "caster sugar.xlsx",
      children: [],
      type: "item",
      id: 3,
    },
    {
      name: "eggs.xlsx",
      children: [],
      type: "item",
      id: 4,
    },
  ],
  files_v01: [
    {
      name: "Chocolate chips.xls",
      type: "item",
      id: "0",
    },
    {
      name: "Baking soda.xlsx",
      children: [],
      type: "item",
      id: "1",
    },
    {
      name: "Baking powder.docx",
      children: [],
      type: "item",
      id: "2",
    },
    {
      name: "Baking powder1.pdf",
      children: [],
      type: "item",
      id: "3",
    },
    {
      name: "Cookie dough.pdf",
      children: [],
      type: "item",
      id: "4",
    },
    {
      name: "Baking powder2.xlsx",
      children: [],
      type: "item",
      id: "5",
    },
    {
      name: "Ingredients",
      children: [
        {
          name: "Flour.jpg",
          children: [],
          type: "item",
          id: "6-1",
        },
        {
          name: "Sugar.jpg",
          children: [],
          type: "item",
          id: "6-2",
        },
        {
          name: "Milk and cream.jpg",
          children: [],
          type: "item",
          id: "6-3",
        },
        {
          name: "Utensils",
          children: [
            {
              name: "Cake tin.jpg",
              children: [],
              type: "item",
              id: "6-3-1",
            },
            {
              name: "Sieve.jpg",
              children: [],
              type: "item",
              id: "6-3-2",
            },
          ],
          type: "node",
        },
        {
          name: "Cocoa.jpg",
          children: [],
          type: "item",
          id: "6-4",
        },
        {
          name: "Bananas.jpg",
          children: [],
          type: "item",
          id: "6-5",
        },
      ],
      type: "node",
      id: "6",
    },
    {
      name: "Baking powder3.xlsx",
      children: [],
      type: "item",
      id: "7",
    },
  ],
  foi_exemption_codes: [
    "27(1)",
    "31",
    "33",
    "36",
    "38(1a)",
    "38(1b)",
    "38(2)",
    "40(2)",
    "43(1)",
    "43(2)",
    "22",
    "22A",
    "23",
    "24",
    "23/24 – In the alternative",
    "26",
    "27(2)",
    "28",
    "29",
    "32",
    "34",
    "35",
    "37(1)(a)",
    "37(1)(aa)",
    "37(1)(ab)",
    "37(1)(ac)",
    "37(1)(ad)",
    "37(1)(b)",
    "37(2)",
    "39",
    "40",
    "41",
    "42",
    "43(1)",
    "43(2)",
    "44",
    "EIRs 12(3) & 13",
    "EIRs 12(5)(a)",
    "EIRs 12(5)(b)",
    "EIRs 12(5)(c)",
    "EIRs 12(5)(d)",
    "EIRs 12(5)(e)",
    "EIRs 12(5)(f)",
    "EIRs 12(5)(g)",
  ],
  languages: [
    { English: "Afar", alpha2: "aa" },
    { English: "Abkhazian", alpha2: "ab" },
    { English: "English", alpha2: "en" },
    { English: "Bihari languages", alpha2: "bh" },
    { English: "Bislama", alpha2: "bi" },
    { English: "Bambara", alpha2: "bm" },
    { English: "Bengali", alpha2: "bn" },
    { English: "Tibetan", alpha2: "bo" },
    { English: "Breton", alpha2: "br" },
    { English: "Bosnian", alpha2: "bs" },
    { English: "Catalan; Valencian", alpha2: "ca" },
    { English: "Chechen", alpha2: "ce" },
    { English: "Chamorro", alpha2: "ch" },
    { English: "Corsican", alpha2: "co" },
    { English: "Cree", alpha2: "cr" },
    { English: "Czech", alpha2: "cs" },
  ],
};
