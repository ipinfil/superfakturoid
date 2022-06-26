export default {
  fetch(request, env, context) {
    return handleRequest(request, env, context);
  },
};

async function handleRequest(request, env, context) {
  if (request.method !== 'POST') return MethodNotAllowed(request);
  let response = await fetch(`${API_URL}/invoices/create`, {
    method: 'POST',
    headers: {
      'Authorization': `SFAPI email=${AUTH_EMAIL}&apikey=${env.API_KEY}&company_id=${AUTH_COMPANY_ID}&module=${AUTH_MODULE}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: await request.text()
  });

  response = await response.json();

  if (response.error !== 0) {
    return new Response(response.error_message, {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    })
  }

  let pdfResponse = await fetch(`${API_URL}/slo/invoices/pdf/${response.data.Invoice.id}/token:${response.data.Invoice.token}`, {
    method: 'GET',
    headers: {
      'Authorization': `SFAPI email=${AUTH_EMAIL}&apikey=${env.API_KEY}&company_id=${AUTH_COMPANY_ID}&module=${AUTH_MODULE}`,
    },
  });

  return new Response(await pdfResponse.blob(), {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
async function MethodNotAllowed(request) {
  return new Response(`Method ${request.method} not allowed.`, {
    status: 403,
    headers: {
      Allow: 'GET',
    },
  });
}
