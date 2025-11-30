import { NextRequest, NextResponse } from 'next/server';

/**
 * GitHub OAuth Callback Handler for Decap CMS
 * This endpoint exchanges the OAuth code for an access token
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { error: 'No authorization code provided' },
      { status: 400 }
    );
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        }),
      }
    );

    const data = await tokenResponse.json();

    if (data.error) {
      console.error('GitHub OAuth error:', data);
      return NextResponse.json(
        { error: data.error_description || data.error },
        { status: 400 }
      );
    }

    // Return HTML that posts message back to opener (Decap CMS)
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Authenticating...</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
            }
            .container {
              text-align: center;
            }
            .spinner {
              border: 4px solid rgba(255,255,255,0.3);
              border-top: 4px solid white;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              animation: spin 1s linear infinite;
              margin: 20px auto;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="spinner"></div>
            <h2>Authentication Successful!</h2>
            <p>Redirecting to CMS...</p>
          </div>
          <script>
            (function() {
              const data = ${JSON.stringify(data)};
              const message = \`authorization:github:success:\${JSON.stringify(data)}\`;
              
              if (window.opener) {
                window.opener.postMessage(message, window.location.origin);
                setTimeout(() => window.close(), 1000);
              } else {
                // Fallback if opener is not available
                window.location.href = '/admin';
              }
            })();
          </script>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.json(
      { error: 'Authentication failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
