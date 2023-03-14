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
    { English: "Welsh", alpha2: "cy" },
    { English: "English", alpha2: "en" },
  ],
  languages_long: [
    { English: "Afar", alpha2: "aa" },
    { English: "Abkhazian", alpha2: "ab" },
    { English: "Avestan", alpha2: "ae" },
    { English: "Afrikaans", alpha2: "af" },
    { English: "Akan", alpha2: "ak" },
    { English: "Amharic", alpha2: "am" },
    { English: "Aragonese", alpha2: "an" },
    { English: "Arabic", alpha2: "ar" },
    { English: "Assamese", alpha2: "as" },
    { English: "Avaric", alpha2: "av" },
    { English: "Aymara", alpha2: "ay" },
    { English: "Azerbaijani", alpha2: "az" },
    { English: "Bashkir", alpha2: "ba" },
    { English: "Belarusian", alpha2: "be" },
    { English: "Bulgarian", alpha2: "bg" },
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
    {
      English:
        "Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic",
      alpha2: "cu",
    },
    { English: "Chuvash", alpha2: "cv" },
    { English: "Welsh", alpha2: "cy" },
    { English: "Danish", alpha2: "da" },
    { English: "German", alpha2: "de" },
    { English: "Divehi; Dhivehi; Maldivian", alpha2: "dv" },
    { English: "Dzongkha", alpha2: "dz" },
    { English: "Ewe", alpha2: "ee" },
    { English: "Greek, Modern (1453-)", alpha2: "el" },
    { English: "English", alpha2: "en" },
    { English: "Esperanto", alpha2: "eo" },
    { English: "Spanish; Castilian", alpha2: "es" },
    { English: "Estonian", alpha2: "et" },
    { English: "Basque", alpha2: "eu" },
    { English: "Persian", alpha2: "fa" },
    { English: "Fulah", alpha2: "ff" },
    { English: "Finnish", alpha2: "fi" },
    { English: "Fijian", alpha2: "fj" },
    { English: "Faroese", alpha2: "fo" },
    { English: "French", alpha2: "fr" },
    { English: "Western Frisian", alpha2: "fy" },
    { English: "Irish", alpha2: "ga" },
    { English: "Gaelic; Scottish Gaelic", alpha2: "gd" },
    { English: "Galician", alpha2: "gl" },
    { English: "Guarani", alpha2: "gn" },
    { English: "Gujarati", alpha2: "gu" },
    { English: "Manx", alpha2: "gv" },
    { English: "Hausa", alpha2: "ha" },
    { English: "Hebrew", alpha2: "he" },
    { English: "Hindi", alpha2: "hi" },
    { English: "Hiri Motu", alpha2: "ho" },
    { English: "Croatian", alpha2: "hr" },
    { English: "Haitian; Haitian Creole", alpha2: "ht" },
    { English: "Hungarian", alpha2: "hu" },
    { English: "Armenian", alpha2: "hy" },
    { English: "Herero", alpha2: "hz" },
    {
      English: "Interlingua (International Auxiliary Language Association)",
      alpha2: "ia",
    },
    { English: "Indonesian", alpha2: "id" },
    { English: "Interlingue; Occidental", alpha2: "ie" },
    { English: "Igbo", alpha2: "ig" },
    { English: "Sichuan Yi; Nuosu", alpha2: "ii" },
    { English: "Inupiaq", alpha2: "ik" },
    { English: "Ido", alpha2: "io" },
    { English: "Icelandic", alpha2: "is" },
    { English: "Italian", alpha2: "it" },
    { English: "Inuktitut", alpha2: "iu" },
    { English: "Japanese", alpha2: "ja" },
    { English: "Javanese", alpha2: "jv" },
    { English: "Georgian", alpha2: "ka" },
    { English: "Kongo", alpha2: "kg" },
    { English: "Kikuyu; Gikuyu", alpha2: "ki" },
    { English: "Kuanyama; Kwanyama", alpha2: "kj" },
    { English: "Kazakh", alpha2: "kk" },
    { English: "Kalaallisut; Greenlandic", alpha2: "kl" },
    { English: "Central Khmer", alpha2: "km" },
    { English: "Kannada", alpha2: "kn" },
    { English: "Korean", alpha2: "ko" },
    { English: "Kanuri", alpha2: "kr" },
    { English: "Kashmiri", alpha2: "ks" },
    { English: "Kurdish", alpha2: "ku" },
    { English: "Komi", alpha2: "kv" },
    { English: "Cornish", alpha2: "kw" },
    { English: "Kirghiz; Kyrgyz", alpha2: "ky" },
    { English: "Latin", alpha2: "la" },
    { English: "Luxembourgish; Letzeburgesch", alpha2: "lb" },
    { English: "Ganda", alpha2: "lg" },
    { English: "Limburgan; Limburger; Limburgish", alpha2: "li" },
    { English: "Lingala", alpha2: "ln" },
    { English: "Lao", alpha2: "lo" },
    { English: "Lithuanian", alpha2: "lt" },
    { English: "Luba-Katanga", alpha2: "lu" },
    { English: "Latvian", alpha2: "lv" },
    { English: "Malagasy", alpha2: "mg" },
    { English: "Marshallese", alpha2: "mh" },
    { English: "Maori", alpha2: "mi" },
    { English: "Macedonian", alpha2: "mk" },
    { English: "Malayalam", alpha2: "ml" },
    { English: "Mongolian", alpha2: "mn" },
    { English: "Marathi", alpha2: "mr" },
    { English: "Malay", alpha2: "ms" },
    { English: "Maltese", alpha2: "mt" },
    { English: "Burmese", alpha2: "my" },
    { English: "Nauru", alpha2: "na" },
    { English: "Bokm\u00e5l, Norwegian; Norwegian Bokm\u00e5l", alpha2: "nb" },
    { English: "Ndebele, North; North Ndebele", alpha2: "nd" },
    { English: "Nepali", alpha2: "ne" },
    { English: "Ndonga", alpha2: "ng" },
    { English: "Dutch; Flemish", alpha2: "nl" },
    { English: "Norwegian Nynorsk; Nynorsk, Norwegian", alpha2: "nn" },
    { English: "Norwegian", alpha2: "no" },
    { English: "Ndebele, South; South Ndebele", alpha2: "nr" },
    { English: "Navajo; Navaho", alpha2: "nv" },
    { English: "Chichewa; Chewa; Nyanja", alpha2: "ny" },
    { English: "Occitan (post 1500)", alpha2: "oc" },
    { English: "Ojibwa", alpha2: "oj" },
    { English: "Oromo", alpha2: "om" },
    { English: "Oriya", alpha2: "or" },
    { English: "Ossetian; Ossetic", alpha2: "os" },
    { English: "Panjabi; Punjabi", alpha2: "pa" },
    { English: "Pali", alpha2: "pi" },
    { English: "Polish", alpha2: "pl" },
    { English: "Pushto; Pashto", alpha2: "ps" },
    { English: "Portuguese", alpha2: "pt" },
    { English: "Quechua", alpha2: "qu" },
    { English: "Romansh", alpha2: "rm" },
    { English: "Rundi", alpha2: "rn" },
    { English: "Romanian; Moldavian; Moldovan", alpha2: "ro" },
    { English: "Russian", alpha2: "ru" },
    { English: "Kinyarwanda", alpha2: "rw" },
    { English: "Sanskrit", alpha2: "sa" },
    { English: "Sardinian", alpha2: "sc" },
    { English: "Sindhi", alpha2: "sd" },
    { English: "Northern Sami", alpha2: "se" },
    { English: "Sango", alpha2: "sg" },
    { English: "Sinhala; Sinhalese", alpha2: "si" },
    { English: "Slovak", alpha2: "sk" },
    { English: "Slovenian", alpha2: "sl" },
    { English: "Samoan", alpha2: "sm" },
    { English: "Shona", alpha2: "sn" },
    { English: "Somali", alpha2: "so" },
    { English: "Albanian", alpha2: "sq" },
    { English: "Serbian", alpha2: "sr" },
    { English: "Swati", alpha2: "ss" },
    { English: "Sotho, Southern", alpha2: "st" },
    { English: "Sundanese", alpha2: "su" },
    { English: "Swedish", alpha2: "sv" },
    { English: "Swahili", alpha2: "sw" },
    { English: "Tamil", alpha2: "ta" },
    { English: "Telugu", alpha2: "te" },
    { English: "Tajik", alpha2: "tg" },
    { English: "Thai", alpha2: "th" },
    { English: "Tigrinya", alpha2: "ti" },
    { English: "Turkmen", alpha2: "tk" },
    { English: "Tagalog", alpha2: "tl" },
    { English: "Tswana", alpha2: "tn" },
    { English: "Tonga (Tonga Islands)", alpha2: "to" },
    { English: "Turkish", alpha2: "tr" },
    { English: "Tsonga", alpha2: "ts" },
    { English: "Tatar", alpha2: "tt" },
    { English: "Twi", alpha2: "tw" },
    { English: "Tahitian", alpha2: "ty" },
    { English: "Uighur; Uyghur", alpha2: "ug" },
    { English: "Ukrainian", alpha2: "uk" },
    { English: "Urdu", alpha2: "ur" },
    { English: "Uzbek", alpha2: "uz" },
    { English: "Venda", alpha2: "ve" },
    { English: "Vietnamese", alpha2: "vi" },
    { English: "Volap\u00fck", alpha2: "vo" },
    { English: "Walloon", alpha2: "wa" },
    { English: "Wolof", alpha2: "wo" },
    { English: "Xhosa", alpha2: "xh" },
    { English: "Yiddish", alpha2: "yi" },
    { English: "Yoruba", alpha2: "yo" },
    { English: "Zhuang; Chuang", alpha2: "za" },
    { English: "Chinese", alpha2: "zh" },
    { English: "Zulu", alpha2: "zu" },
  ],
};
