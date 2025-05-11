import React from 'react';
import {getCustomer} from "@/lib/queries/getCustomer";
import BackButton from "@/components/custom/BackButton";
import * as Sentry from "@sentry/nextjs";

type Props = {
    searchParams: Promise<{ [key: string]: string | undefined }>
}

async function CustomerFormPage({searchParams}: Props) {
    try {
        const {customerId} = await searchParams;

        // edit customer form
        if (customerId) {
            const customer = await getCustomer(parseInt(customerId));

            if (!customer) {
                return (
                    <>
                        <h2 className="text-2xl mb-2">Customer ID #{customerId} not found</h2>
                        <BackButton title="Go Back" variant="default"/>
                    </>
                )
            }
            console.log(customer);
            // put customer form component
        } else {
            // new customer form component
        }


    } catch (e) {
        if (e instanceof Error) {
            Sentry.captureException(e);
            throw e;
        }
    }

    return (
        <div></div>
    );
}

export default CustomerFormPage;