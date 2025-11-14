# Fix for UNC Path Issue

## Problem
Windows doesn't support UNC paths (`\\Mac\...`) as current directory for Node.js. This causes the error:
```
UNC paths are not supported. Defaulting to Windows directory.
Error: Cannot find module 'C:\Windows\server-example.js'
```

## Solutions

### Solution 1: Use the Batch File (Easiest)

I've created a batch file that handles the path correctly:

**Double-click `start-server.bat`** or run in terminal:
```cmd
start-server.bat
```

### Solution 2: Map Network Drive

1. Open File Explorer
2. Right-click "This PC" > "Map network drive"
3. Choose a drive letter (e.g., `Z:`)
4. Enter path: `\\Mac\Home\Documents\Web Development\commerce-website-01`
5. Click "Finish"
6. Open terminal and run:
   ```cmd
   Z:
   cd "Web Development\commerce-website-01"
   npm start
   ```

### Solution 3: Use PowerShell Script

Run the PowerShell script:
```powershell
.\start-server.ps1
```

### Solution 4: Copy Project to Local Drive (Recommended)

For best performance and compatibility:

1. Copy the entire project folder to a local drive:
   - Example: `C:\Users\YourName\Documents\commerce-website-01`
2. Open terminal in the new location
3. Run: `npm start`

### Solution 5: Use Full Path in Command

Run Node.js with full path:
```cmd
node "\\Mac\Home\Documents\Web Development\commerce-website-01\server-example.js"
```

But you'll need to set working directory in the server code or use absolute paths.

## Recommended: Use the Batch File

The easiest solution is to use the `start-server.bat` file I created. Just double-click it or run it from terminal.

## After Fixing

Once the server starts, you should see:
```
Server running on http://localhost:3000
```

Then test at: http://localhost:3000

