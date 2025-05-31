import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'; 
import { NextResponse } from 'next/server';

const allowedOrigins = ['http://localhost:5173/', 'http://localhost:3000']
const corsOption = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}
const isProtectedRoutes = createRouteMatcher([
    '/dashboard(.*)', '/payment(.*)'
])


export default clerkMiddleware(async (auth, req)=>{
    const origin = (req.headers.get('origin') ?? '').replace(/\/$/, '');
    console.log('Origin:', origin);

    // Normalize allowed origins by removing trailing slashes
    const isAllowedOrigin = allowedOrigins.some(allowedOrigin =>
        allowedOrigin.replace(/\/$/, '') === origin
    );
    console.log('inmiddleware', isAllowedOrigin);
    if (req.method == 'OPTIONS'){
        const preflightHeaders = {
            ... (isAllowedOrigin && {'Access-Control-Allow-Origin': origin}),
            ...corsOption,
        }
        console.log('ye ho gaya ')
        return  NextResponse.json({}, {headers: preflightHeaders})
    }

    if (isProtectedRoutes(req)){
        console.log(req, "protekldfjadfk")
        auth.protect()
    }

    const response = NextResponse.next()

    if(isAllowedOrigin){
        response.headers.set('Access-Control-Allow-Origin', origin)
        console.log('allowed ', origin)
    }

    Object.entries(corsOption).forEach(([key, value])=>{
        response.headers.set(key, value)
    })

    return response
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}; 