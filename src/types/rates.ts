export type Rate = {
    name: string;
    type: string;
    unit: string;
    value: string;
}

export type Rates = {
    rates: {
        [key: string]: Rate
    }
}