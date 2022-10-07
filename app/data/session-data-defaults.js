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
    "27(1)",
    "27(2)",
    "31",
    "33",
    "36",
    "38(1a)",
    "38(1b)",
    "38(2)",
    "40(2)",
    "43(1)",
    "43(2)",
    "-",
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
    "-",
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
    {
      language_desc: "Amharic",
      iso_code: "amh",
    },
    {
      language_desc: "Arabic and English",
      iso_code: "ara eng",
    },
    {
      language_desc: "Chinese",
      iso_code: "chi",
    },
    {
      language_desc: "Chinese and English",
      iso_code: "chi eng",
    },
    {
      language_desc: "Danish and German",
      iso_code: "dan ger",
    },
    {
      language_desc: "Dutch, English and French",
      iso_code: "dut eng fre",
    },
    {
      language_desc: "Dutch, English, French and Latin",
      iso_code: "dut eng fre lat",
    },
    {
      language_desc: "Dutch, French and Italian",
      iso_code: "dut fre ita",
    },
    {
      language_desc: "Dutch, French, Latin and Spanish",
      iso_code: "dut fre lat spa",
    },
    {
      language_desc: "English",
      iso_code: "eng",
    },
    {
      language_desc: "English and French",
      iso_code: "eng fre",
    },
    {
      language_desc: "English, French and German",
      iso_code: "eng fre ger",
    },
    {
      language_desc: "English, French, German and Italian",
      iso_code: "eng fre ger ita",
    },
    {
      language_desc: "English, French, German and Latin",
      iso_code: "eng fre ger lat",
    },
    {
      language_desc: "English, French, German and Russian",
      iso_code: "eng fre ger rus",
    },
    {
      language_desc: "English, French and Italian",
      iso_code: "eng fre ita",
    },
    {
      language_desc: "English, French, Italian and Latin",
      iso_code: "eng fre ita lat",
    },
    {
      language_desc: "English, French and Latin",
      iso_code: "eng fre lat",
    },
    {
      language_desc: "English, French and Spanish",
      iso_code: "eng fre spa",
    },
    {
      language_desc: "English and German",
      iso_code: "eng ger",
    },
    {
      language_desc: "English, German and Italian",
      iso_code: "eng ger ita",
    },
    {
      language_desc: "English and Greek",
      iso_code: "eng gre",
    },
    {
      language_desc: "English and Italian",
      iso_code: "eng ita",
    },
    {
      language_desc: "English, Italian and Latin",
      iso_code: "eng ita lat",
    },
    {
      language_desc: "English and Japanese",
      iso_code: "eng jpn",
    },
    {
      language_desc: "English and Latin",
      iso_code: "eng lat",
    },
    {
      language_desc: "English and Portuguese",
      iso_code: "eng por",
    },
    {
      language_desc: "English and Welsh",
      iso_code: "eng wel",
    },
    {
      language_desc: "French",
      iso_code: "fre",
    },
    {
      language_desc: "French and Latin",
      iso_code: "fre lat",
    },
    {
      language_desc: "German",
      iso_code: "ger",
    },
    {
      language_desc: "German, Italian and Japanese",
      iso_code: "ger ita jpn",
    },
    {
      language_desc: "German, Italian, Latin and Swedish",
      iso_code: "ger ita lat swe",
    },
    {
      language_desc: "Italian and Latin",
      iso_code: "ita lat",
    },
    {
      language_desc: "Latin",
      iso_code: "lat",
    },
    {
      language_desc: "Miscellaneous",
      iso_code: "mul",
    },
    {
      language_desc: "Portuguese",
      iso_code: "por",
    },
    {
      language_desc: "Spanish",
      iso_code: "spa",
    },
    {
      language_desc: "Danish",
      iso_code: "dan",
    },
    {
      language_desc: "Dutch",
      iso_code: "dut",
    },
    {
      language_desc: "Swedish",
      iso_code: "swe",
    },
    {
      language_desc: "English and Russian",
      iso_code: "eng rus",
    },
    {
      language_desc: "English and Spanish",
      iso_code: "eng spa",
    },
    {
      language_desc: "English and Norwegian",
      iso_code: "eng nor",
    },
    {
      language_desc: "Italian",
      iso_code: "ita",
    },
    {
      language_desc: "Tibetan",
      iso_code: "tib",
    },
    {
      language_desc: "Dutch and Japanese",
      iso_code: "dut jpn",
    },
    {
      language_desc: "Chinese, English, Malay and Tamil",
      iso_code: "chi eng may tam",
    },
    {
      language_desc: "Chinese and Malay",
      iso_code: "chi may",
    },
    {
      language_desc: "Chinese, English and Malay",
      iso_code: "chi eng may",
    },
    {
      language_desc: "English and Tamil",
      iso_code: "eng tam",
    },
    {
      language_desc: "English and Gaelic",
      iso_code: "eng gla",
    },
    {
      language_desc: "Dutch and English",
      iso_code: "dut eng",
    },
    {
      language_desc: "Arabic",
      iso_code: "ara",
    },
    {
      language_desc: "French and German",
      iso_code: "fre ger",
    },
    {
      language_desc: "Dutch and Spanish",
      iso_code: "dut spa",
    },
    {
      language_desc: "English and Swedish",
      iso_code: "eng swe",
    },
    {
      language_desc: "French, German and Latin",
      iso_code: "fre ger lat",
    },
    {
      language_desc: "English and Icelandic",
      iso_code: "eng ice",
    },
    {
      language_desc: "Dutch and French",
      iso_code: "dut fre",
    },
    {
      language_desc: "Danish and Latin",
      iso_code: "dan lat",
    },
    {
      language_desc: "English and Polish",
      iso_code: "eng pol",
    },
    {
      language_desc: "Arabic, English and French",
      iso_code: "ara eng fre",
    },
    {
      language_desc: "Norwegian",
      iso_code: "nor",
    },
    {
      language_desc: "Divehi and English",
      iso_code: "div eng",
    },
    {
      language_desc: "Russian",
      iso_code: "rus",
    },
    {
      language_desc: "Amharic and English",
      iso_code: "amh eng",
    },
    {
      language_desc: "French and Swedish",
      iso_code: "fre swe",
    },
    {
      language_desc: "English, German and Russian",
      iso_code: "eng ger rus",
    },
    {
      language_desc: "French and Russian",
      iso_code: "fre rus",
    },
    {
      language_desc: "Italian and Spanish",
      iso_code: "ita spa",
    },
    {
      language_desc: "Malay",
      iso_code: "may",
    },
    {
      language_desc: "Greek",
      iso_code: "gre",
    },
    {
      language_desc: "English, Hungarian and Polish",
      iso_code: "eng hun pol",
    },
    {
      language_desc: "Bulgarian and French",
      iso_code: "bul fre",
    },
    {
      language_desc: "French and Greek",
      iso_code: "fre gre",
    },
    {
      language_desc: "Japanese",
      iso_code: "jpn",
    },
    {
      language_desc: "English and Miscellaneous",
      iso_code: "eng mul",
    },
    {
      language_desc: "English and Turkish",
      iso_code: "eng tur",
    },
    {
      language_desc: "Persian",
      iso_code: "per",
    },
    {
      language_desc: "English and Persian",
      iso_code: "eng per",
    },
    {
      language_desc: "Dutch, English, French and German",
      iso_code: "dut eng fre ger",
    },
    {
      language_desc: "Turkish",
      iso_code: "tur",
    },
    {
      language_desc: "English, French and Russian",
      iso_code: "eng fre rus",
    },
    {
      language_desc: "Arabic, English and German",
      iso_code: "ara eng ger",
    },
    {
      language_desc: "Arabic, English, French and Italian",
      iso_code: "ara eng fre ita",
    },
    {
      language_desc: "English, Italian, Latin and Turkish",
      iso_code: "eng ita lat tur",
    },
    {
      language_desc: "English, French, Latin and Russian",
      iso_code: "eng fre lat rus",
    },
    {
      language_desc: "French and Italian",
      iso_code: "fre ita",
    },
    {
      language_desc: "Serbo-Croatian",
      iso_code: "scr",
    },
    {
      language_desc: "English and Korean",
      iso_code: "eng kor",
    },
    {
      language_desc: "German and Latin",
      iso_code: "ger lat",
    },
    {
      language_desc: "English and Urdu",
      iso_code: "eng urd",
    },
    {
      language_desc: "Bulgarian and English",
      iso_code: "bul eng",
    },
    {
      language_desc: "French, German and Italian",
      iso_code: "fre ger ita",
    },
    {
      language_desc: "French, German and Romanian",
      iso_code: "fre ger rum",
    },
    {
      language_desc: "French and Polish",
      iso_code: "fre pol",
    },
    {
      language_desc: "Romanian",
      iso_code: "rum",
    },
    {
      language_desc: "Czech",
      iso_code: "cze",
    },
    {
      language_desc: "English and Hungarian",
      iso_code: "eng hun",
    },
    {
      language_desc: "Czech, English, French and Hungarian",
      iso_code: "cze eng fre hun",
    },
    {
      language_desc: "Persian and Russian",
      iso_code: "per rus",
    },
    {
      language_desc: "Arabic, English, Persian and Turkish",
      iso_code: "ara eng per tur",
    },
    {
      language_desc: "Arabic, English and Italian",
      iso_code: "ara eng ita",
    },
    {
      language_desc: "Dutch and German",
      iso_code: "dut ger",
    },
    {
      language_desc: "English, French and Greek",
      iso_code: "eng fre gre",
    },
    {
      language_desc: "Danish, English and French",
      iso_code: "dan eng fre",
    },
    {
      language_desc: "English, French, Portuguese and Spanish",
      iso_code: "eng fre por spa",
    },
    {
      language_desc: "English, French, Italian and Spanish",
      iso_code: "eng fre ita spa",
    },
    {
      language_desc: "Dutch, English and Latin",
      iso_code: "dut eng lat",
    },
    {
      language_desc: "French and Turkish",
      iso_code: "fre tur",
    },
    {
      language_desc: "English, French and Swedish",
      iso_code: "eng fre swe",
    },
    {
      language_desc: "Danish, English and Latin",
      iso_code: "dan eng lat",
    },
    {
      language_desc: "Chinese, Latin and Manchu",
      iso_code: "chi lat mnc",
    },
    {
      language_desc: "German and Italian",
      iso_code: "ger ita",
    },
    {
      language_desc: "Dutch and Latin",
      iso_code: "dut lat",
    },
    {
      language_desc: "Greek and Latin",
      iso_code: "gre lat",
    },
    {
      language_desc: "Dutch, French and German",
      iso_code: "dut fre ger",
    },
    {
      language_desc: "French and Spanish",
      iso_code: "fre spa",
    },
    {
      language_desc: "Dutch, French and Portuguese",
      iso_code: "dut fre por",
    },
    {
      language_desc: "Dutch, French and Spanish",
      iso_code: "dut fre spa",
    },
    {
      language_desc: "Dutch, English, French and Portuguese",
      iso_code: "dut eng fre por",
    },
    {
      language_desc: "Dutch, English and Yiddish",
      iso_code: "dut eng yid",
    },
    {
      language_desc: "Portuguese and Spanish",
      iso_code: "por spa",
    },
    {
      language_desc: "Arabic, English and Hebrew",
      iso_code: "ara eng heb",
    },
    {
      language_desc: "Dutch, English, French and Spanish",
      iso_code: "dut eng fre spa",
    },
    {
      language_desc: "Dutch, English and Spanish",
      iso_code: "dut eng spa",
    },
    {
      language_desc: "English, French and Polish",
      iso_code: "eng fre pol",
    },
    {
      language_desc: "Polish",
      iso_code: "pol",
    },
    {
      language_desc: "English, German, Polish and Russian",
      iso_code: "eng ger pol rus",
    },
    {
      language_desc: "English, Hebrew and Polish",
      iso_code: "eng heb pol",
    },
    {
      language_desc: "English, Italian and Polish",
      iso_code: "eng ita pol",
    },
    {
      language_desc: "Chinese, English and French",
      iso_code: "chi eng fre",
    },
    {
      language_desc: "Polish and Russian",
      iso_code: "pol rus",
    },
    {
      language_desc: "Dutch, Portuguese and Yiddish",
      iso_code: "dut por yid",
    },
    {
      language_desc: "Ladino",
      iso_code: "lad",
    },
    {
      language_desc: "Hebrew, Ladino and Spanish",
      iso_code: "heb lad spa",
    },
    {
      language_desc: "Hebrew",
      iso_code: "heb",
    },
    {
      language_desc: "English, German, Italian and Japanese",
      iso_code: "eng ger ita jap",
    },
    {
      language_desc: "Dutch, English and German",
      iso_code: "dut eng ger",
    },
    {
      language_desc: "Dutch, German and Latin",
      iso_code: "dut ger lat",
    },
    {
      language_desc: "Czech, English, French and Latin",
      iso_code: "cze eng fre lat",
    },
    {
      language_desc: "Hungarian",
      iso_code: "hun",
    },
    {
      language_desc: "Estonian",
      iso_code: "est",
    },
    {
      language_desc: "Latvian",
      iso_code: "lav",
    },
    {
      language_desc: "Lithuanian",
      iso_code: "lit",
    },
    {
      language_desc: "Maltese",
      iso_code: "mal",
    },
    {
      language_desc: "Slovakian",
      iso_code: "slk",
    },
    {
      language_desc: "Slovenian",
      iso_code: "slv",
    },
    {
      language_desc: "Finnish",
      iso_code: "fin",
    },
    {
      language_desc: "English, French and Romanian",
      iso_code: "eng fre rum",
    },
    {
      language_desc: "English, French, German and Serbian",
      iso_code: "eng fre ger srp",
    },
    {
      language_desc: "Serbian",
      iso_code: "srp",
    },
    {
      language_desc: "Arabic, English, French and Spanish",
      iso_code: "ara eng fre spa",
    },
    {
      language_desc: "Arabic and French",
      iso_code: "ara fre",
    },
    {
      language_desc: "French and Portuguese",
      iso_code: "fre por",
    },
    {
      language_desc: "English, French and Portuguese",
      iso_code: "eng fre por",
    },
    {
      language_desc: "English, Portuguese and Spanish",
      iso_code: "eng por spa",
    },
    {
      language_desc: "French, Portuguese and Spanish",
      iso_code: "fre por spa",
    },
    {
      language_desc: "English and Maltese",
      iso_code: "eng mal",
    },
    {
      language_desc: "Welsh",
      iso_code: "wel",
    },
    {
      language_desc: "Thai",
      iso_code: "tha",
    },
    {
      language_desc: "French, Latin and Spanish",
      iso_code: "fre lat spa",
    },
    {
      language_desc: "English, French, Latin and Spanish",
      iso_code: "eng fre lat spa",
    },
    {
      language_desc: "Armenian, Ottoman Turkish, Persian and Spanish",
      iso_code: "arm ota per spa",
    },
    {
      language_desc: "Spanish and Miscellaneous",
      iso_code: "spa mul",
    },
    {
      language_desc: "Armenian, French, Portuguese and Spanish",
      iso_code: "arm fre por spa",
    },
    {
      language_desc: "Dutch, French, Italian and Spanish",
      iso_code: "dut fre ita spa",
    },
    {
      language_desc: "Basque, French and Italian",
      iso_code: "bas fre ita",
    },
    {
      language_desc: "Arabic, Armenian, Persian and Others",
      iso_code: "ara arm per oth",
    },
    {
      language_desc: "Afrikaans and English",
      iso_code: "afr eng",
    },
    {
      language_desc: "Danish and English",
      iso_code: "dan eng",
    },
    {
      language_desc: "Amharic, English and French",
      iso_code: "amh eng fre",
    },
    {
      language_desc: "English and Thai",
      iso_code: "eng tha",
    },
    {
      language_desc: "English, French, Russian and Spanish",
      iso_code: "eng fre rus spa",
    },
    {
      language_desc: "English, German and Japanese",
      iso_code: "eng ger jpn",
    },
    {
      language_desc: "English and Romanian",
      iso_code: "eng rum",
    },
    {
      language_desc: "Hebrew and Latin",
      iso_code: "heb lat",
    },
    {
      language_desc: "Croatian, English and Serbian",
      iso_code: "hrv eng srp",
    },
    {
      language_desc: "English, German, Greek and Spanish",
      iso_code: "eng ger gre spa",
    },
    {
      language_desc: "English, Flemish and French",
      iso_code: "eng fle fre",
    },
    {
      language_desc: "English, Hindi and Tamil",
      iso_code: "eng hin tam",
    },
    {
      language_desc: "English and Arabic",
      iso_code: "eng, ara",
    },
    {
      language_desc: "English, French and Arabic",
      iso_code: "eng, fre, ara",
    },
    {
      language_desc: "English and Swahili",
      iso_code: "eng swa",
    },
    {
      language_desc: "English, Hindi and Urdu",
      iso_code: "eng hin urd",
    },
    {
      language_desc: "English, Danish and German",
      iso_code: "eng dan ger",
    },
    {
      language_desc: "Danish, English, French and German",
      iso_code: "dan eng fre ger",
    },
    {
      language_desc: "Danish, English and German",
      iso_code: "dan eng ger",
    },
    {
      language_desc: "Basque, English and French",
      iso_code: "bas eng fre",
    },
    {
      language_desc: "Greek, Italian and Latin",
      iso_code: "gre ita lat",
    },
    {
      language_desc: "English and others",
      iso_code: "eng oth",
    },
    {
      language_desc: "Various",
      iso_code: "var",
    },
    {
      language_desc: "French and Dutch",
      iso_code: "fre dut",
    },
    {
      language_desc: "French and English",
      iso_code: "fre eng",
    },
    {
      language_desc: "French, Dutch and German",
      iso_code: "fre dut ger",
    },
    {
      language_desc: "German and French",
      iso_code: "ger fre",
    },
    {
      language_desc: "Dutch, German and French",
      iso_code: "dut ger fre",
    },
    {
      language_desc: "English, Dutch and French",
      iso_code: "eng dut fre",
    },
    {
      language_desc: "English, French and Ottoman Turkish",
      iso_code: "eng fre ota",
    },
  ],
};
