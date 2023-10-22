import Point from "../primitives/point";

export const getNearestPoint = (location: Point, points: Point[], threshold = Number.MAX_SAFE_INTEGER) => {
  let minDistance = Number.MAX_SAFE_INTEGER;
  let nearest = null;

  for (const point of points) {
    const dist = distance(point, location);

    if (dist < minDistance && dist < threshold) {
      minDistance = dist;
      nearest = point;
    }
  }

  return nearest;
}

const distance = (point1: Point, point2: Point) => {
  return Math.hypot(point1.x - point2.x, point1.y - point2.y);
}