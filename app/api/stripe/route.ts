import { auth, currentUser } from '@clerk/nextjs';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getAbsoluteUrl } from '@/lib/utils';



const settingsUrl = getAbsoluteUrl('/settings');

export async function GET(req: Request) {
    try {
        const { userId } = auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse('unauthenticated', { status: 401 });
        }

        const userSubscription = await db.userSubscription.findUnique({
            where: {
                userId,
            }
        });

        if (userSubscription && userSubscription.stripeCustomerId) {
            // user has sub and wants to update their billing info or cancel
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl
            });

            return new NextResponse(JSON.stringify({
                url: stripeSession.url
            }));
        }
        // first time checkout 
        const stripeSession = await stripe.checkout.sessions.create({
            billing_address_collection: 'auto',
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ['card'],
            mode: 'subscription',
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: 'USD',
                        product_data: {
                            name: 'Companion Pro',
                            description: 'Create custom AI companions'
                        },
                        unit_amount: 999,
                        recurring: {
                            interval: 'month'
                        }
                    },
                    quantity: 1
                }
            ],
            metadata: {
                userId
            }
        });

        return new NextResponse(JSON.stringify({
            url: stripeSession.url
        }))

    } catch (e) {
        console.log('STRIPE_GET', e);
        return new NextResponse('internal error', { status: 500 });
    }
}
