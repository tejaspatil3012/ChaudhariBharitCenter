/**
 * ============================================================================
 * Chaudhari Bharit Center - Automatic Customer Reviews Google Apps Script
 * ============================================================================
 * 
 * PURPOSE:
 * 1. Automatically listens for new Google Form submissions.
 * 2. Extracts ONLY 3 public fields:
 *    - Customer Name
 *    - Overall Experience Rating (1-5 numeric rating)
 *    - Additional Comments / Feedback
 * 3. Copies them into a separate public sheet tab named "PublicReviews".
 * 4. NEVER copies private fields (Email, Phone number, Cleanliness/Service ratings).
 * 5. Prevents duplicate entries.
 * 6. "PublicReviews" tab is then published to the web as CSV for the website.
 * 
 * ============================================================================
 */

// Configuration constants
var CONFIG = {
  // Name of the public sheet tab created for the website
  PUBLIC_SHEET_NAME: "PublicReviews",
  
  // Headers for the public sheet
  PUBLIC_HEADERS: [
    "Customer Name",
    "Overall Rating",
    "Additional Comments",
    "Submission ID"
  ]
};

/**
 * 1. Helper function: Get or create the PublicReviews sheet tab
 */
function getOrCreatePublicSheet(spreadsheet) {
  var publicSheet = spreadsheet.getSheetByName(CONFIG.PUBLIC_SHEET_NAME);
  
  if (!publicSheet) {
    publicSheet = spreadsheet.insertSheet(CONFIG.PUBLIC_SHEET_NAME);
    // Add headers
    publicSheet.appendRow(CONFIG.PUBLIC_HEADERS);
    // Format header row
    var headerRange = publicSheet.getRange(1, 1, 1, CONFIG.PUBLIC_HEADERS.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#254D32"); // Deep Leaf Green matching restaurant theme
    headerRange.setFontColor("#FFFFFF");
    publicSheet.setFrozenRows(1);
    
    // Auto resize columns
    publicSheet.autoResizeColumns(1, CONFIG.PUBLIC_HEADERS.length);
  }
  
  return publicSheet;
}

/**
 * 2. Helper function: Extract 1-5 numeric rating safely from string or number
 */
function parseRatingValue(val) {
  if (val === null || val === undefined) return 5;
  if (typeof val === 'number') {
    return Math.min(5, Math.max(1, Math.round(val)));
  }
  var str = String(val).trim();
  // Extract first digit between 1 and 5
  var match = str.match(/[1-5]/);
  if (match) {
    return parseInt(match[0], 10);
  }
  return 5; // Default fallback rating
}

/**
 * 3. Helper function: Find column index by matching header name
 */
function findColumnIndex(headers, patterns, excludePatterns) {
  for (var i = 0; i < headers.length; i++) {
    var header = String(headers[i]).toLowerCase().trim();
    
    // Check exclusion first (e.g. avoid cleanliness / service when looking for overall)
    var isExcluded = false;
    if (excludePatterns && excludePatterns.length > 0) {
      for (var e = 0; e < excludePatterns.length; e++) {
        if (header.indexOf(excludePatterns[e].toLowerCase()) !== -1) {
          isExcluded = true;
          break;
        }
      }
    }
    if (isExcluded) continue;
    
    // Check match patterns
    for (var p = 0; p < patterns.length; p++) {
      if (header.indexOf(patterns[p].toLowerCase()) !== -1) {
        return i;
      }
    }
  }
  return -1;
}

/**
 * 4. Helper function: Get existing Submission IDs from PublicReviews to prevent duplicates
 */
function getExistingSubmissionIds(publicSheet) {
  var lastRow = publicSheet.getLastRow();
  var existingIds = {};
  
  if (lastRow > 1) {
    var ids = publicSheet.getRange(2, 4, lastRow - 1, 1).getValues();
    for (var i = 0; i < ids.length; i++) {
      var id = String(ids[i][0]).trim();
      if (id) {
        existingIds[id] = true;
      }
    }
  }
  
  return existingIds;
}

/**
 * 5. MAIN EVENT HANDLER: onFormSubmit(e)
 * Triggered automatically upon every Google Form submission.
 */
function onFormSubmit(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var publicSheet = getOrCreatePublicSheet(ss);
  var existingIds = getExistingSubmissionIds(publicSheet);
  
  // Try to read submission ID from range or timestamp
  var submissionId = "";
  if (e && e.range) {
    submissionId = "row_" + e.range.getRow();
  } else {
    submissionId = "time_" + new Date().getTime();
  }
  
  // Prevent duplicate if already exists
  if (existingIds[submissionId]) {
    Logger.log("Duplicate submission ignored: " + submissionId);
    return;
  }
  
  var name = "";
  var rating = 5;
  var comment = "";
  
  // If event object has namedValues, search headers dynamically
  if (e && e.namedValues) {
    for (var key in e.namedValues) {
      var lowerKey = key.toLowerCase();
      var val = e.namedValues[key][0] ? String(e.namedValues[key][0]).trim() : "";
      
      // Check Name
      if (lowerKey.indexOf("name") !== -1 || lowerKey.indexOf("नाव") !== -1 || lowerKey.indexOf("customer") !== -1) {
        name = val;
      }
      // Check Overall Rating (exclude cleanliness / service)
      else if ((lowerKey.indexOf("overall") !== -1 || lowerKey.indexOf("rating") !== -1 || lowerKey.indexOf("अनुभव") !== -1 || lowerKey.indexOf("दर्जा") !== -1) &&
               lowerKey.indexOf("clean") === -1 && lowerKey.indexOf("service") === -1 && lowerKey.indexOf("स्वच्छता") === -1 && lowerKey.indexOf("सेवा") === -1) {
        rating = parseRatingValue(val);
      }
      // Check Additional Comments / Feedback
      else if (lowerKey.indexOf("comment") !== -1 || lowerKey.indexOf("feedback") !== -1 || lowerKey.indexOf("अभिप्राय") !== -1 || lowerKey.indexOf("सूचना") !== -1 || lowerKey.indexOf("अनुभव") !== -1) {
        if (lowerKey.indexOf("rating") === -1 && lowerKey.indexOf("दर्जा") === -1) {
          comment = val;
        }
      }
    }
  } else if (e && e.range) {
    // Fallback: read directly from the row that was just inserted
    var sheet = e.range.getSheet();
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var rowValues = sheet.getRange(e.range.getRow(), 1, 1, sheet.getLastColumn()).getValues()[0];
    
    var nameIdx = findColumnIndex(headers, ["name", "नाव", "customer"]);
    var ratingIdx = findColumnIndex(headers, ["overall", "rating", "अनुभव", "दर्जा"], ["clean", "service", "स्वच्छता", "सेवा"]);
    var commentIdx = findColumnIndex(headers, ["comment", "feedback", "अभिप्राय", "सूचना", "suggestions", "remarks"], ["rating", "दर्जा"]);
    
    if (nameIdx !== -1) name = String(rowValues[nameIdx] || "").trim();
    if (ratingIdx !== -1) rating = parseRatingValue(rowValues[ratingIdx]);
    if (commentIdx !== -1) comment = String(rowValues[commentIdx] || "").trim();
  }
  
  // Default name if left blank by customer
  if (!name) {
    name = "अतिथी ग्राहक";
  }
  
  // Append ONLY the 3 sanitized public fields + internal submission ID
  publicSheet.appendRow([name, rating, comment, submissionId]);
  Logger.log("Successfully added review for: " + name + " (Rating: " + rating + "★)");
}

/**
 * 6. ONE-CLICK SYNC: syncAllReviews()
 * Run this function manually once from the Apps Script editor to copy
 * all existing/past form responses that were submitted prior to trigger installation.
 */
function syncAllReviews() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var formResponseSheet = null;
  
  // Find the form responses sheet (usually "Form Responses 1" or similar)
  for (var i = 0; i < sheets.length; i++) {
    var sheetName = sheets[i].getName();
    if (sheetName !== CONFIG.PUBLIC_SHEET_NAME && 
        (sheetName.indexOf("Form Responses") !== -1 || sheetName.indexOf("प्रतिसाद") !== -1 || sheets[i].getLastRow() > 1)) {
      formResponseSheet = sheets[i];
      break;
    }
  }
  
  if (!formResponseSheet) {
    Logger.log("Form responses sheet not found!");
    return;
  }
  
  var publicSheet = getOrCreatePublicSheet(ss);
  var existingIds = getExistingSubmissionIds(publicSheet);
  
  var lastRow = formResponseSheet.getLastRow();
  var lastCol = formResponseSheet.getLastColumn();
  
  if (lastRow <= 1) {
    Logger.log("No responses to sync.");
    return;
  }
  
  var data = formResponseSheet.getRange(1, 1, lastRow, lastCol).getValues();
  var headers = data[0];
  
  var nameIdx = findColumnIndex(headers, ["name", "नाव", "customer"]);
  var ratingIdx = findColumnIndex(headers, ["overall", "rating", "अनुभव", "दर्जा"], ["clean", "service", "स्वच्छता", "सेवा"]);
  var commentIdx = findColumnIndex(headers, ["comment", "feedback", "अभिप्राय", "सूचना", "suggestions", "remarks"], ["rating", "दर्जा"]);
  
  var addedCount = 0;
  
  for (var r = 1; r < data.length; r++) {
    var rowValues = data[r];
    var submissionId = "row_" + (r + 1);
    
    // Skip if already in PublicReviews
    if (existingIds[submissionId]) {
      continue;
    }
    
    var name = nameIdx !== -1 ? String(rowValues[nameIdx] || "").trim() : "";
    var rating = ratingIdx !== -1 ? parseRatingValue(rowValues[ratingIdx]) : 5;
    var comment = commentIdx !== -1 ? String(rowValues[commentIdx] || "").trim() : "";
    
    if (!name) {
      name = "अतिथी ग्राहक";
    }
    
    publicSheet.appendRow([name, rating, comment, submissionId]);
    existingIds[submissionId] = true;
    addedCount++;
  }
  
  Logger.log("Sync complete! Added " + addedCount + " reviews to " + CONFIG.PUBLIC_SHEET_NAME);
}

/**
 * 7. INSTALL TRIGGER: createTrigger()
 * Run this function once from Apps Script editor to automatically configure the onFormSubmit trigger!
 */
function createTrigger() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Remove any existing onFormSubmit triggers to prevent duplicate firings
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "onFormSubmit") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  
  // Create installable form-submit trigger
  ScriptApp.newTrigger("onFormSubmit")
    .forSpreadsheet(ss)
    .onFormSubmit()
    .create();
    
  Logger.log("Form submit trigger successfully created!");
}
