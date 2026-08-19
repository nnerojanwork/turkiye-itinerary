import foodData from "./turkey_food.json";

export const dishes = foodData.dishes;

export function dishesForDestination(destinationId) {
  return dishes.filter((d) => d.regionHighlight?.includes(destinationId));
}
