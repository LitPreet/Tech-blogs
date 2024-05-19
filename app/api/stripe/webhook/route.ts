import Stripe from "stripe";
import { headers } from "next/headers";
import { createSupbaseAdmin } from "@/lib/supabase";
import { buffer } from "node:stream/consumers";

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET!;

const stripe = new Stripe(process.env.STRIPE_SK_KEY!);

export async function POST(req: any) {
	const rawBody = await buffer(req.body);
	try {
		const sig = headers().get("stripe-signature");
		let event;
		try {
			event = stripe.webhooks.constructEvent(
				rawBody,
				sig!,
				endpointSecret
			);
		} catch (err: any) {
			return Response.json({ error: `Webhook Error ${err?.message!} ` });
		}
		switch (event.type) {
            // case 'payment_intent.succeeded':
            //     const paymentIntentSucceeded = event.data.object
            //     console.log(paymentIntentSucceeded)
            //     break;
			case "customer.subscription.deleted":
				const deleteSubscription = event.data.object;
				await onCancelSubscription(
					deleteSubscription.status === "active",
					deleteSubscription.id
				);
				break;
			case "customer.updated":
				const customer = event.data.object;
				const subscription = await stripe.subscriptions.list({
					customer: customer.id,
				});
				if (subscription.data.length) {
					const sub = subscription.data[0];
				const { error } = await onSuccessSubscription(
						sub.status === "active",
						sub.id,
						customer.id,
						customer.email!
					);
					if(error?.message){
						return Response.json({"error": error.message})
					}
				}
			default:
				console.log(`Unhandled event type ${event.type}`);
		}
		return Response.json({});
	} catch (e) {
		return Response.json({ error: `Webhook Error}` });
	}
}

const onSuccessSubscription = async (
	status: boolean,
	subscription_id: string,
	customer_id: string,
	email: string
) => {
	// console.log('subscribe called',status,subscription_id,email,customer_id);
	const supabase = await createSupbaseAdmin();
	return await supabase
		.from("users")
		.update({
			stripe_subscription_id: subscription_id,
			stripe_cutsomer_id: customer_id,
			subscriptions: status,
		})
		.eq("email", email)
		// .select("id")
		// .single();
		// 	await supabase.auth.admin.updateUserById(data!.id, {
		// 		user_metadata: { stripe_customer_id: null },
		// 	});
		
};

const onCancelSubscription = async (
	status: boolean,
	subscription_id: string
) => {
	const supabase = await createSupbaseAdmin();
	const { data, error } = await supabase
		.from("users")
		.update({
			stripe_subscription_id: null,
			stripe_cutsomer_id: null,
			subscriptions: status,
		})
		.eq("stripe_subscriptoin_id", subscription_id)
		.select("id")
		.single();

	await supabase.auth.admin.updateUserById(data?.id!, {
		user_metadata: { stripe_customer_id: null },
	});
};