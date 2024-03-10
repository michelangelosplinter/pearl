$endpoint = new-object System.Net.IPEndPoint([ipaddress]::any, 1235) 
$listener = new-object System.Net.Sockets.TcpListener $EndPoint
while (1) {
  $listener.start()
  $data = $listener.AcceptTcpClient() # will block here until connection 
  $bytes = New-Object System.Byte[] 1024
  $stream = $data.GetStream()
  try {
    while (($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0) {
      Write-host "[+] Connection started ..."
      $EncodedText = New-Object System.Text.ASCIIEncoding
      $data = $EncodedText.GetString($bytes, 0, $i)
      Write-Host $data
    }
  }
  catch {
    Write-Host "[-] Connection closed "
  }
}
$stream.close()
$listener.stop()

function Get-ADData {
  # Fuck you N***a
  param(
    [string]$username,
    [string]$password
  )
  
  # Converting credentials to secure string
  $SecureString = ConvertTo-SecureString $password -AsPlainText -Force
  $credential = New-Object System.Management.Automation.PSCredential( $username, $SecureString )
  
  # Creating a background thread
  Enter-PSSession -Computername localhost -Credential $credential
  Get-localuser | select-Object -Property Name, fullname, sid, description, lastlogon | ConvertTo-Json -depth 1  > "1.json"
  Get-localgroup | select-Object -Property Name, fullname, sid, description, lastlogon | ConvertTo-Json -depth 1  > "2.json"
  Exit-PSSession
  
  if (Test-Path -Path "1.json", "2.json" -PathType leaf) {
    return 1
  }
  else {
    return 0
  }
}
