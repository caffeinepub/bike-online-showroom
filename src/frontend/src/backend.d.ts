import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Bike {
    id: bigint;
    weight?: bigint;
    frame?: string;
    colorOptions: Array<string>;
    mileage?: string;
    name: string;
    description: string;
    category: string;
    brand: string;
    price: bigint;
    photos: Array<string>;
    engine?: string;
}
export interface Inquiry {
    name: string;
    email: string;
    message: string;
    phone: string;
    bikeId: bigint;
}
export interface backendInterface {
    /**
     * / Adds a new bike to the catalog. Returns the new bike's unique ID.
     */
    addBike(name: string, brand: string, category: string, price: bigint, photos: Array<string>, engine: string | null, weight: bigint | null, frame: string | null, colorOptions: Array<string>, description: string, mileage: string | null): Promise<void>;
    /**
     * / Returns all bikes sorted by price from lowest to highest.
     */
    getAllBikes(): Promise<Array<Bike>>;
    /**
     * / Returns all submitted inquiries.
     */
    getAllInquiries(): Promise<Array<Inquiry>>;
    /**
     * / Retrieves a single bike by its unique ID. Traps if the ID does not exist!
     */
    getBike(id: bigint): Promise<Bike>;
    /**
     * / Submits a new inquiry for a specific bike.
     */
    submitInquiry(name: string, email: string, phone: string, bikeId: bigint, message: string): Promise<void>;
}
