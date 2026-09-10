/**
 * Briticana Internship Form → Google Sheets backend
 * -------------------------------------------------
 * SETUP (5 minutes, 100% free, ~15 GB Google Drive storage):
 *
 * 1. Create a new Google Sheet: https://sheets.new
 *    Name it "Briticana Applications"
 * 2. Extensions → Apps Script
 * 3. Delete any code in Code.gs and paste THIS entire file
 * 4. Click Deploy → New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL
 * 6. Paste that URL into public/index.html → const WEBHOOK_URL = "YOUR_URL";
 * 7. Redeploy the Vercel site (or just open the HTML locally)
 *
 * Dashboard = the Google Sheet itself (filter, sort, share with team).
 * Resumes (under 4 MB) are stored as base64 in a column; you can also
 * auto-save them to Drive (uncomment the DriveApp block below).
 */

const SHEET_NAME = 'Applications';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Header row – order matches common fields
      sheet.appendRow([
        'Submitted At',
        'First Name',
        'Last Name',
        'Country of Residence',
        'University / Institution',
        'Current Qualification',
        'LinkedIn Profile',
        'Preferred Domain',
        'Preferred Duration',
        'Current Status',
        'Career Assistance',
        'Job Interest',
        'Prior Internship',
        'Prior Internship Details',
        'Work Experience',
        'Work Experience Details',
        'Relevant Skills',
        'Projects/Certs',
        'Projects/Certs Details',
        'Visa Status',
        'Career Path',
        'Why Briticana',
        'Expectations',
        'Learning Outcomes',
        'Career Challenge',
        'Confidence Level',
        'Resume File',
        'Declaration Consent',
        'Source',
        'Resume Drive Link'
      ]);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, 30).setFontWeight('bold');
    }

    // Optional: save resume file to Google Drive folder
    let driveLink = '';
    if (data['Resume Base64'] && data['Resume File']) {
      try {
        const folderName = 'Briticana Resumes';
        let folders = DriveApp.getFoldersByName(folderName);
        const folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);
        const blob = Utilities.newBlob(
          Utilities.base64Decode(data['Resume Base64']),
          data['Resume Mime'] || 'application/pdf',
          data['Resume File']
        );
        const file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        driveLink = file.getUrl();
      } catch (err) {
        driveLink = 'Error: ' + err.message;
      }
    }

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data['First Name'] || '',
      data['Last Name'] || '',
      data['Country of Residence'] || '',
      data['University / Institution'] || '',
      data['Current Qualification'] || '',
      data['LinkedIn Profile'] || '',
      data['Preferred Domain'] || '',
      data['Preferred Duration'] || '',
      data['Current Status'] || '',
      data['Career Assistance'] || '',
      data['Job Interest'] || '',
      data['Prior Internship'] || '',
      data['Prior Internship Details'] || '',
      data['Work Experience'] || '',
      data['Work Experience Details'] || '',
      data['Relevant Skills'] || '',
      data['Projects/Certs'] || '',
      data['Projects/Certs Details'] || '',
      data['Visa Status'] || '',
      data['Career Path'] || '',
      data['Why Briticana'] || '',
      data['Expectations'] || '',
      data['Learning Outcomes'] || '',
      data['Career Challenge'] || '',
      data['Confidence Level'] || '',
      data['Resume File'] || '',
      data['Declaration Consent'] || '',
      data.source || 'Web Form',
      driveLink
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('Briticana Internship Form webhook is live. Use POST.')
    .setMimeType(ContentService.MimeType.TEXT);
}
