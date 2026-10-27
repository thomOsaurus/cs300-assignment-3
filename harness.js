import { validateRecord } from "./toolkit.js";
import { normalizeRecord } from "./toolkit.js";
import { filterRecords } from "./toolkit.js";
import { searchRecords } from "./toolkit.js";
import { sortRecords } from "./toolkit.js";
import { summarizeRecords } from "./toolkit.js";
import { buildReport } from "./toolkit.js";

// Assignment 3: verification harness. Run it with: node harness.js
//
// 1. Import your functions from "./toolkit.js" and load your scenario's dataset from data/.
// 2. Write at least 12 named cases: normal inputs plus the five edge cases
//    (empty array, missing property, invalid number or wrong type,
//    different capitalization, equal values when sorting) and a nonmutation check.
// 3. Each case prints its name, the expected result, the actual result,
//    and the word PASS or FAIL, for example:
//    PASS  search ignores capitalization  expected: 1  actual: 1
// 4. Work out each expected result from the data before you run the case.
console.log("Starter ready. Implement the operations and your checks before claiming any pass.");


function check(name, expected, actual) {
    const result = JSON.stringify(actual) === JSON.stringify(expected)
    ? "PASS" : "FAIL";

   console.log(`${result}  ${name}  expected: ${JSON.stringify(expected)}  actual: ${JSON.stringify(actual)}`);
} 

//Validate Record Tests//
check(
    "missing title validation",
     false,
    validateRecord({ minutes: 120 }).valid   
);

check(
    "invalid minutes validation",
    false,
    validateRecord({
        title: "Robot Garden",
        minutes: "thirty" 
    }).valid
);
//Normalize Record Tests//
check(
    "normalize removes extra spaces",
    "Robot Garden",
    normalizeRecord({ title: "  Robot Garden  " }).title
);
const originalRecord = {
     title: "  Robot Garden  ",
     creator: "  Mina Reed  "
 };
 const before = JSON.stringify(originalRecord);

 normalizeRecord(originalRecord);

 check(
     "normalize does not change original",
     before,
     JSON.stringify(originalRecord)
 );

 //Filter Records Tests//
 const testBooks = [
     { title: "Book A", category: "Art" },
     { title: "Book B", category: "Study" },
     { title: "book C", category: "Art" }
 ];
 const artBooks = filterRecords(
    testBooks,
    book => book.category === "Art"
);
check(
    "filter records by category", 2, artBooks.length);

//Search Records Tests//
const searchBooks = [
    { title: "Robot Garden", creator: "Mina Reed", description: "A robotics project" },
    { title: "Space Odyssey", creator: "Alex Stone", description: "Exploring the stars" },
    { title: "Art Basics", creator: "Jordan Lee", description: "Learning to paint" }
];

check(
    "search ignores capitalization",
    1,
    searchRecords(searchBooks, "ROBOT").length
);

check(
    "search matches creator",
    1,
    searchRecords(searchBooks, "alex").length
);

check(
    "search matches description",
    1,
    searchRecords(searchBooks, "PAINT").length
);



    //Sort Records Tests//
const sortBooks = [
    { title: "Space Odyssey", minutes: 90 },
    { title: "Robot Garden", minutes: 90 },
    { title: "Art Basics", minutes: 30 }
];

const originalOrder = JSON.stringify(sortBooks);
const sortedBooks = sortRecords(sortBooks, "minutes");

check(
    "sort by minutes",
    [30, 90, 90],
    sortedBooks.map(book => book.minutes)
);

check(
    "sort equal minutes alaphabetically",
    ["Art Basics", "Robot Garden", "Space Odyssey"],
    sortedBooks.map(book => book.title)
);

check(
    "sort does not change original",
    originalOrder,
    JSON.stringify(sortBooks)
);  

//Summarize Records Tests//
const summarizeBooks = [
    { title: "Art Basics", minutes: 30 },
    { title: "Robot Garden", minutes: 90 },
    { title: "Space Odyssey", minutes: 150 }
];

const summary = summarizeRecords(summarizeBooks);

check(
    "summarize count",
    3,
    summary.count
);

check(
    "summary calculates total minutes",
    270,
    summary.totalMinutes
);

check(
    "summary calculates average minutes",
    90,
    summary.averageMinutes
);

check(
    "summary handles empty array",
    { count: 0, totalMinutes: 0, averageMinutes: 0 },
    summarizeRecords([]) 
);

//Build Report Tests//
const reportBooks = [
    { title: "Robot Garden", creator: "Mina Reed", minutes: 90},
    { title: "Space Odyssey", creator: "Alex Stone", minutes: 150},
    { title: "Art Basics", creator: "Mina Reed", minutes: 30}
    
];

const report = buildReport(reportBooks, "Mina");

check(
    "report finds matching books",
    2,
    report.matches.length
);
check(
    "report summarizes total minutes",
    120,
    report.summary.totalMinutes
);
check(
    "report calcualates average minutes",
    60,
    report.summary.averageMinutes

);