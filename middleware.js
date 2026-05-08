export const config = { matcher: '/' };

export default function middleware(request) {
  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim();

  if (ip === '168.232.42.99') {
    return;
  }

  const city = decodeURIComponent(request.headers.get('x-vercel-ip-city') || '');

  if (/chapec/i.test(city)) {
    return new Response('Not Found', { status: 404 });
  }
}
