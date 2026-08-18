import activitiesData from "./turkey_activities.json";
import linksData from "./turkey_activity_links.json";

function mergeDestinationActivities(destinationId) {
  const activities = activitiesData.destinations[destinationId]?.activities ?? [];
  const linksById = new Map(
    (linksData.destinations[destinationId]?.activities ?? []).map((l) => [l.id, l])
  );

  return activities.map((activity) => {
    const link = linksById.get(activity.id);
    return {
      ...activity,
      bookingUrl: link?.bookingUrl ?? null,
      wikipediaTitle: link?.wikipediaTitle ?? null,
      bookingSourced: link?.sourced ?? false,
      bookingSourceNote: link?.sourceNote ?? null,
    };
  });
}

export const activitiesByDestination = Object.fromEntries(
  Object.keys(activitiesData.destinations).map((id) => [
    id,
    mergeDestinationActivities(id),
  ])
);
