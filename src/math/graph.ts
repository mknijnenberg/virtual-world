import Point from "../primitives/point";
import Segment from "../primitives/segment";

type IGraph = {
  points: Point[];
  segments: Segment[];
  addPoint(point: Point): void;
  containsPoint(point: Point): Point | undefined;
  tryAddPoint(point: Point): boolean;
  removePoint(point: Point): void;
  addSegment(segment: Segment): void;
  containsSegment(segment: Segment): Segment | undefined;
  tryAddSegment(segment: Segment): boolean;
  removeSegment(segment: Segment): void;
  getSegmentsWithPoint(point: Point): Segment[];
  dispose(): void;
  draw(ctx: CanvasRenderingContext2D): void;
}

class Graph implements IGraph {
  points: Point[];
  segments: Segment[];

  constructor(
    points: Point[] = [],
    segments: Segment[] = []
  ) {
    this.points = points;
    this.segments = segments;
  }

  addPoint(point: Point) {
    this.points.push(point);
  }

  containsPoint(point: Point) {
    return this.points.find((p) => p.equals(point));
  }

  tryAddPoint(point: Point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    }

    return false;
  }

  removePoint(point: Point) {
    const segments = this.getSegmentsWithPoint(point);

    for (const segment of segments) {
      this.removeSegment(segment);
    }

    this.points.splice(this.points.indexOf(point), 1);
  }

  addSegment(segment: Segment) {
    this.segments.push(segment);
  }

  containsSegment(segment: Segment) {
    return this.segments.find((s) => s.equals(segment));
  }

  tryAddSegment(segment: Segment) {
    if (!this.containsSegment(segment) && !segment.point1.equals(segment.point2)) {
      this.addSegment(segment);
      return true;
    }

    return false;
  }

  removeSegment(segment: Segment) {
    this.segments.splice(this.segments.indexOf(segment), 1);
  }

  getSegmentsWithPoint(point: Point) {
    const segments = [];

    for (const segment of this.segments) {
      if (segment.includes(point)) {
        segments.push(segment);
      }
    }

    return segments;
  }

  /**
   * Removes all points and segments from the graph.
   * By defining the length to 0 we avoid creating a new array.
   */
  dispose() {
    this.points.length = 0;
    this.segments.length = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const segment of this.segments) {
      segment.draw(ctx);
    }

    for (const point of this.points) {
      point.draw(ctx);
    } 
  }
}


export default Graph;
