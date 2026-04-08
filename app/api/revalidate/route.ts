import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const secret = request.headers.get('x-revalidation-secret');
    const expectedSecret = process.env.REVALIDATION_SECRET;

    // Validate the secret token
    if (!expectedSecret || secret !== expectedSecret) {
        return NextResponse.json(
            { error: 'Invalid revalidation secret' },
            { status: 401 }
        );
    }

    try {
        // Revalidate the homepage and about page
        revalidatePath('/');
        revalidatePath('/about');
        revalidatePath('/news');

        return NextResponse.json({
            revalidated: true,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Revalidation error:', error);
        return NextResponse.json(
            { error: 'Revalidation failed' },
            { status: 500 }
        );
    }
}
