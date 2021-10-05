export interface IOrderCard {
  readonly _id: string;
  readonly ingredients: string[];
  readonly status: string;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly number: number;
}
