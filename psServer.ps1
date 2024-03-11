function New-ScriptBlockCallback 
    {
        [Diagnostics.CodeAnalysis.SuppressMessageAttribute('PSUseShouldProcessForStateChangingFunctions', '')]
        param(
            [parameter(Mandatory)]
            [ValidateNotNullOrEmpty()]
            [scriptblock]$Callback
        )

        # Is this type already defined?
        if (-not ( 'CallbackEventBridge' -as [type])) {
            Add-Type @' 
                using System; 

                public sealed class CallbackEventBridge { 
                    public event AsyncCallback CallbackComplete = delegate { }; 

                    private CallbackEventBridge() {} 

                    private void CallbackInternal(IAsyncResult result) { 
                        CallbackComplete(result); 
                    } 

                    public AsyncCallback Callback { 
                        get { return new AsyncCallback(CallbackInternal); } 
                    } 

                    public static CallbackEventBridge Create() { 
                        return new CallbackEventBridge(); 
                    } 
                } 
'@
        }
        $bridge = [callbackeventbridge]::create()
        Register-ObjectEvent -InputObject $bridge -EventName callbackcomplete -Action $Callback -MessageData $args > $null
        $bridge.Callback
    }



$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://127.0.0.1:8081/') 
$listener.Start()
Write-host 'Listening'

$StartServiceTime = Get-Date

$requestListener = {
            [cmdletbinding()]
            param($result)

            [System.Net.HttpListener]$listener = $result.AsyncState;

            $context = $listener.EndGetContext($result);
            $request = $context.Request
            $response = $context.Response

            # Add cors header.
            $context.Response.AppendHeader("mode", "cors")
            $context.Response.AppendHeader("Access-Control-Allow-Origin", "*")
            $context.Response.AppendHeader("Access-Control-Allow-Headers", "*")
            $context.Response.AppendHeader("Access-Control-Allow-Methods", "GET,POST")

            if ($request.Url -match '/users') 
                {
                    write-host "Sending user data"
                    $context.Response.StatusCode = 200
                    $context.Response.ContentType = "application/json"
                    $message = Get-localuser | select-Object -Property Name, fullname, sid, description, lastlogon | ConvertTo-Json -depth 1
                }
            Elseif ($request.Url -match '/groups')
                {
                    write-host "Sending user data"
                    $context.Response.StatusCode = 200
                    $context.Response.ContentType = "application/json"
                    $message = Get-localGroup | convertto-json -depth 1
                }

            [byte[]]$buffer = [System.Text.Encoding]::UTF8.GetBytes($message)
            $response.ContentLength64 = $buffer.length
            $output = $response.OutputStream
            $output.Write($buffer, 0, $buffer.length)
            $output.Close()

    }  


$context = $listener.BeginGetContext((New-ScriptBlockCallback -Callback $requestListener), $listener)


while ($listener.IsListening)
{
    If ($context.IsCompleted -eq $true) {$context = $listener.BeginGetContext((New-ScriptBlockCallback -Callback $requestListener), $listener)}
}


$listener.Close()
Write-host 'Terminating ...'