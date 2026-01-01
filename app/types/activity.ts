export interface Activity {
    id: string,
    type: "ADD_PRODUCT" | "STOCK_INCREASE" | "STOCK_DECREASE" | "OUT_OF_STOCK"
    productName: string,
    delta: number,
    timestamp: number
}