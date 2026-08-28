import { NextResponse } from 'next/server';
import { enquiryService, EnquiryData } from '@/services/enquiryService';

export async function POST(request: Request) {
    try {
        const data: EnquiryData = await request.json();

        // Basic validation
        if (!data.name || !data.email || !data.message) {
            return NextResponse.json(
                { success: false, message: 'Name, email, and message are required.' },
                { status: 400 }
            );
        }

        const response = await enquiryService.submitEnquiry(data);

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error('Enquiry Error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error while submitting enquiry.' },
            { status: 500 }
        );
    }
}
