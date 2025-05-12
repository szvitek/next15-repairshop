import React from 'react';
import BackButton from "@/components/custom/BackButton";
import {getTicket} from "@/lib/queries/getTicket";
import {getCustomer} from "@/lib/queries/getCustomer";
import * as Sentry from "@sentry/nextjs";
import TicketForm from "@/app/(rs)/tickets/form/TicketForm";

type Props = {
    searchParams: Promise<{ [key: string]: string | undefined }>
}

async function TicketFormPage({searchParams}: Props) {
    try {
        const {customerId, ticketId} = await searchParams;

        if (!customerId && !ticketId) {
            return (
                <>
                    <h2 className="text-2xl mb-2">Ticket ID or Customer ID required to load ticket
                        form
                    </h2>
                    <BackButton title="Go Back" variant="default"/>
                </>
            );
        }

        // new ticket form component
        if (customerId) {
            const customer = await getCustomer(parseInt(customerId));

            if (!customer) {
                return (
                    <>
                        <h2 className="text-2xl mb-2">Customer ID #{customerId} not found</h2>
                        <BackButton title="Go Back" variant="default"/>
                    </>
                );
            }

            if (!customer.active) {
                return (
                    <>
                        <h2 className="text-2xl mb-2">Customer ID #{customerId} is not active.</h2>
                        <BackButton title="Go Back" variant="default"/>
                    </>
                )
            }

            // return ticket form
            console.log(customer);
            return <TicketForm customer={customer}/>
        }

        // edit ticket form
        if (ticketId) {
            const ticket = await getTicket(parseInt(ticketId));

            if (!ticket) {
                return (
                    <>
                        <h2 className="text-2xl mb-2">Ticket ID #{ticketId} not found</h2>
                        <BackButton title="Go Back" variant="default"/>
                    </>
                )
            }

            const customer = await getCustomer(ticket.customerId);

            // return ticket form
            console.log('ticket: ', ticket);
            console.log('customer: ', customer);
            return <TicketForm customer={customer} ticket={ticket}/>
        }

    } catch (e) {
        if (e instanceof Error) {
            Sentry.captureException(e);
            throw e;
        }
    }
}

export default TicketFormPage;