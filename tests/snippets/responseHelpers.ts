import { expect } from "@playwright/test";

export function expectStatusCode(
    response: { status(): number }, 
    expectedCode: number
) {
    expect(response.status()).toBe(expectedCode)
};

export function expectValidId(id: number) {
    expect(id).toBeGreaterThan(0);
};

export function expectFieldsAreNull(data: Record<string, unknown>, fields: string[]) {
    fields.forEach(field => {
        expect(data[field]).toBeNull();
    });
};