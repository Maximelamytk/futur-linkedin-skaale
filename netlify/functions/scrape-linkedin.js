// Netlify Function: Scrape LinkedIn Profile via Scrapin.io

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { linkedinUrl } = JSON.parse(event.body);

    if (!linkedinUrl) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'LinkedIn URL required' })
      };
    }

    const SCRAPIN_API_KEY = process.env.SCRAPIN_API_KEY;

    if (!SCRAPIN_API_KEY) {
      console.error('SCRAPIN_API_KEY not configured');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'API not configured' })
      };
    }

    // Call Scrapin.io API (v1 endpoint with linkedInUrl parameter - capital I)
    const apiUrl = `https://api.scrapin.io/v1/enrichment/profile?apikey=${SCRAPIN_API_KEY}&linkedInUrl=${encodeURIComponent(linkedinUrl)}`;

    console.log('Calling Scrapin API for:', linkedinUrl);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    const responseText = await response.text();
    console.log('Scrapin response status:', response.status);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse Scrapin response:', responseText);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Invalid response from Scrapin API' })
      };
    }

    if (!response.ok) {
      console.error('Scrapin API error:', response.status, data);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: 'Failed to fetch profile', details: data })
      };
    }

    if (!data.person) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Profile not found' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('Scrape function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
