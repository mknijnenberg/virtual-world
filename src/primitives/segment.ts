import Point from "./point";

type DrawOptions = {
  width?: number;
  color?: string;
  dash?: number[];
}

type ISegment = {
  point1: Point;
  point2: Point;
  equals(segment: Segment): boolean;
  draw(ctx: CanvasRenderingContext2D, options?: DrawOptions): void;
}

class Segment implements ISegment {
  point1: Point;
  point2: Point;

  constructor(point1: Point, point2: Point) {
    this.point1 = point1;
    this.point2 = point2;
  }

  equals(segment: Segment) {
    return this.includes(segment.point1) && this.includes(segment.point2);
  }

  includes(point: Point) {
    return (
      this.point1.equals(point) ||
      this.point2.equals(point)
    );
  }

  draw(ctx: CanvasRenderingContext2D, {width = 2, color = 'black', dash = []} = {}) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.setLineDash(dash);
    ctx.moveTo(this.point1.x, this.point1.y);
    ctx.lineTo(this.point2.x, this.point2.y);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}

export default Segment;