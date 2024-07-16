import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';

export type TCGPage = {
    data: Card[];
    count: number;
    page: number;
    pageSize: number;
    totalCount: number;
};