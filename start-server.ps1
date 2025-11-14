# PowerShell script to start server from UNC path
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath
node server-example.js

