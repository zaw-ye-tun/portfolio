import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect('https://zawyetun.net/api/auth');
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new NextResponse(renderMessage('error', 'OAuth not configured'), {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  try {
    const tokenResponse = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }),
      }
    );

    const data = await tokenResponse.json();

    if (data.error) {
      return new NextResponse(renderMessage('error', data.error_description || data.error), {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    return new NextResponse(renderMessage('success', data.access_token), {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    return new NextResponse(renderMessage('error', 'Authentication failed'), {
      headers: { 'Content-Type': 'text/html' },
    });
  }
}

function renderMessage(status: 'success' | 'error', content: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <title>OAuth Callback</title>
</head>
<body>
  <script>
    (function() {
      function sendMessage(message) {
        var sent = false;
        
        // Try window.opener
        if (window.opener) {
          window.opener.postMessage(message, "*");
          sent = true;
        }
        
        // Try parent window
        if (window.parent && window.parent !== window) {
          window.parent.postMessage(message, "*");
          sent = true;
        }
        
        return sent;
      }
      
      var status = "${status}";
      var content = "${content}";
      var provider = "github";
      var message;
      
      if (status === "success") {
        // Decap CMS expects: authorization:github:success:{"token":"xxx","provider":"github"}
        message = "authorization:" + provider + ":success:" + JSON.stringify({
          token: content,
          provider: provider
        });
      } else {
        message = "authorization:" + provider + ":error:" + content;
      }
      
      console.log("OAuth callback - sending message:", message);
      
      // Send immediately
      var sent = sendMessage(message);
      
      // Also set up listener for when CMS asks
      window.addEventListener("message", function(e) {
        console.log("Received:", e.data);
        if (e.data === "authorizing:github") {
          sendMessage(message);
        }
      });
      
      // Keep trying for 5 seconds then close
      var attempts = 0;
      var interval = setInterval(function() {
        sendMessage(message);
        attempts++;
        if (attempts > 50) {
          clearInterval(interval);
          document.body.innerHTML = "<p>Authentication complete. You can close this window.</p>";
        }
      }, 100);
      
      // Try to close after delay
      setTimeout(function() {
        window.close();
      }, 5000);
    })();
  </script>
  <p>Authenticating...</p>
</body>
</html>`;
}
