// Assignment 3: JavaScript Data Toolkit
//
// Write and export your seven functions in this file. You may use these names:
//
//   validateRecord(record)            returns useful error information for one record
//   normalizeRecord(record)           returns a cleaned copy; never changes the original record
//   filterRecords(records, condition) returns the records that match a condition you pass in
//   searchRecords(records, query)     matches 2+ properties, ignoring capitalization
//   sortRecords(records, property)    returns a new sorted array; never changes the original array
//   summarizeRecords(records)         returns a summary, such as a count, total, or average
//   buildReport(records, query)       combines at least two of the functions above
//
// Above each function, write a short comment: what it takes, what it returns,
// and whether it changes its input. Decide your tie rule for equal values
// and the shape of your validation errors before you write the code.


// Takes one book record and checks if its data is valid.
// Returns validation results and any errors.
// Does not change the original record.

// Validate Record//
export function validateRecord(record) {
  const errors = [];
  if (typeof record.title !== 'string' || record.title.trim() === '') {
    errors.push('title is missing');
  }
   if (typeof record.minutes !== 'number') {
    errors.push('minutes must be a number');
}
 return {
    valid: errors.length === 0,
    errors: errors
  };
}

//Normalize Record//
// Takes one book record and returns a cleaned copy.
// Removes extra spaces from text fields.
// Does not change the original record.

export function normalizeRecord(record) {
  const cleaned = { ...record };
    if (typeof cleaned.title === 'string') {
        cleaned.title = cleaned.title.trim();
    }
    for (const field of ["creator", "category", "description"]) {
        if (typeof cleaned[field] === 'string') {
            cleaned[field] = cleaned[field].trim();
        }
    }
    return cleaned;
}

//Filter Records//
// Takes an array of book records and a condition function.
// Returns a new array containing only matching records.
// Does not change the original array.

export function filterRecords(records, condition) {
  return records.filter(condition);
}

//Search Records//
// Takes an array of book records and a search query.
// Returns a new array of matching records.
// Does not change the original array.

export function searchRecords(records, query) {
    const searchTerm = String(query).toLowerCase().trim();

    return records.filter(record => 
        ["title", "creator", "description"].some(field =>
            String(record[field] ?? "").toLowerCase().includes(searchTerm)
        )
    );
}

//Sort Records//
// Takes an array of book records and a property to sort by
// Returns a new sorted array
// Does not change the original array
// Ties are broken alphabetically by title

export function sortRecords(records, property) {
    return [...records].sort((a, b) => {
        const first = a[property];
        const second = b[property];
    if (typeof first === "number" && typeof second === "number") {
        if (first !== second) {
            return first - second;
        }
    } else {
        const comparison = String(first ?? "").localeCompare(
             String(second ?? "")
        );
        
        if (comparison !== 0) {
            return comparison;
        }
    }
    return String(a.title ?? "").localeCompare
    (String(b.title ?? "")
    );
});
}

//Summarize Records//
// Takes an array of book records
// Returns the count, total minutes, and average minutes
// Does not change the original array

export function summarizeRecords(records) {
    const count = records.length;

    const totalMinutes = records.reduce(
        (total, record) => total + record.minutes,
        0
    );
    const averageMinutes = count === 0 ? 0 :totalMinutes / count;

    return {
        count: count,       
        totalMinutes,
        averageMinutes
    };
}

//Build Report//
// Combines the book records into a report
// Uses the existing toolkit functions
// Does not change the original array

export function buildReport(records, query) {
    const matches = searchRecords(records, query);
    const summary = summarizeRecords(matches);
    return {
      matches,
      summary  
    };
} 