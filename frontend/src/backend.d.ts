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
    name: string;
    description: string;
    category: string;
    brand: string;
    price: bigint;
    photos: Array<string>;
    engine?: string;
}
export interface backendInterface {
    addBike(name: string, brand: string, category: string, price: bigint, photos: Array<string>, engine: string | null, weight: bigint | null, frame: string | null, colorOptions: Array<string>, description: string): Promise<void>;
    getAllBikes(): Promise<Array<Bike>>;
    getBike(id: bigint): Promise<Bike>;
    submitInquiry(name: string, email: string, phone: string, bikeId: bigint, message: string): Promise<void>;
}
