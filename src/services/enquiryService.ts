export interface EnquiryData {
    name: string;
    company?: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export interface EnquiryResponse {
    success: boolean;
    message: string;
}

export interface EnquiryRepository {
    submitEnquiry(data: EnquiryData): Promise<EnquiryResponse>;
}

class LocalEnquiryRepository implements EnquiryRepository {
    async submitEnquiry(data: EnquiryData): Promise<EnquiryResponse> {
        // For MVP, simulate a successful network request and server logging
        console.log("=== NEW ENQUIRY RECEIVED (MVP MODE) ===");
        console.log(JSON.stringify(data, null, 2));

        // Simulate latency
        await new Promise((resolve) => setTimeout(resolve, 800));

        return {
            success: true,
            message: "Thank you for reaching out. Our engineering team will contact you shortly."
        };
    }
}

// Singleton design pattern. Later we can swap this with ZohoEnquiryRepository
export const enquiryService = new LocalEnquiryRepository();
