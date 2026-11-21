# Google Sheets Integration Guide for Chaudhari Bharit Center Customer Reviews

Follow these simple steps to connect your Google Form responses to your website automatically.

---

### Step 1: Open Your Google Form Response Spreadsheet
1. Open your Google Form: [https://forms.gle/jbYaSzky5tTK4xCR7](https://forms.gle/jbYaSzky5tTK4xCR7) in edit mode.
2. Go to the **Responses** tab.
3. Click **"Link to Sheets"** (or view the existing Google Spreadsheet).

---

### Step 2: Open Google Apps Script
1. In the Google Spreadsheet menu, click **Extensions** > **Apps Script**.
2. Delete any default code in the script editor (`function myFunction() {...}`).
3. Copy the entire contents of `Code.gs` and paste it into the editor.
4. Click the **Save** icon (diskette icon) or press `Ctrl + S`.
5. Name the project `ChaudhariBharitReviews`.

---

### Step 3: Initialize & Create the Automatic Trigger
1. At the top of the Apps Script editor, in the function dropdown (next to "Debug"), select **`createTrigger`**.
2. Click **Run**.
3. Google will ask for authorization on the first run:
   - Click **Review permissions**.
   - Choose your Google account.
   - Click **Advanced** (bottom left of popup).
   - Click **Go to ChaudhariBharitReviews (unsafe)**.
   - Click **Allow**.
4. The execution log will show: `Form submit trigger successfully created!`.
5. *(Optional)* If you already submitted any test reviews earlier:
   - Select **`syncAllReviews`** from the function dropdown.
   - Click **Run**.
   - It will immediately sync your existing reviews to the `PublicReviews` tab.

---

### Step 4: Publish ONLY the `PublicReviews` Tab as CSV
1. Return to your Google Spreadsheet. You will now see a new green tab named **`PublicReviews`**.
2. In the spreadsheet menu, go to **File** > **Share** > **Publish to the web**.
3. In the dialog:
   - Change **"Entire Document"** dropdown to **`PublicReviews`**.
   - Change **"Web page"** dropdown to **`Comma-separated values (.csv)`**.
4. Click **Publish** and confirm **OK**.
5. Copy the generated link (it will look like:
   `https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?gid=...&single=true&output=csv`).

---

### Step 5: Add the CSV URL to your Website
1. Open `src/config/feedbackConfig.js` in your project.
2. Paste the URL into `GOOGLE_SHEET_REVIEWS_CSV_URL`:
   ```javascript
   export const GOOGLE_SHEET_REVIEWS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/.../pub?gid=...&single=true&output=csv';
   ```
3. Save the file.
4. All submitted reviews will now automatically appear on your website!
