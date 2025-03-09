// types/allergen.ts
export interface Allergen {
    name: string;
    riskLevel?: 'low' | 'medium' | 'high';
  }
  
  export interface FoodDetectionResult {
    foodName: string;
    allergens: Allergen[];
    confidence?: number;  // Optional if you want to keep legacy support
  }
  
  // Legacy type alias for backward compatibility (optional)
  export type FoodItem = {
    name: string;
    confidence: number;
    allergens: Allergen[];
  };
  