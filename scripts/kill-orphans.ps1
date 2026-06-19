param(
  [Parameter(Mandatory = $true)]
  [string]$ProjectName
)

Get-CimInstance Win32_Process |
  Where-Object { $_.Name -eq "node.exe" } |
  Where-Object {
    $_.CommandLine -like "*next*" -and $_.CommandLine -like "*$ProjectName*"
  } |
  ForEach-Object {
    try {
      Stop-Process -Id $_.ProcessId -Force -ErrorAction Stop
      Write-Output $_.ProcessId
    } catch {
      # Process đã tắt
    }
  }
