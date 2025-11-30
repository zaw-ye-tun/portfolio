import { NextRequest, NextResponse } from 'next/server';

/**
 * GitHub OAuth Authorization Endpoint for Decap CMS
 * This endpoint redirects to GitHub's OAuth authorization page
 */
export async function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  
  if (!clientId) {
    return NextResponse.json(
      { error: 'GitHub Client ID not configured' },
      { status: 500 }
    );
  }

  // Build the GitHub OAuth authorization URL
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `https://zawyetun.net/api/callback`,
    scope: 'repo,user',
    state: Math.random().toString(36).substring(7),
  });

  const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
  
  return NextResponse.redirect(authUrl);
}
