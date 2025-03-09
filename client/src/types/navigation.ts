// types/navigation.ts
export type Allergen = {
  name: string;
  confidence: number;
};

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Results: {
    foodName: string;
    allergens: Allergen[];
  };
};
