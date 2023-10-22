type DrawOptions = {
  size?: number;
  color?: string;
  outline?: boolean;
  fill?: boolean;
}

type IPoint = {
  x: number;
  y: number;
  draw(ctx: CanvasRenderingContext2D, options?: DrawOptions): void;
}

class Point implements IPoint {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  equals(point: Point) {
    return this.x === point.x && this.y === point.y;
  }

  draw(ctx: CanvasRenderingContext2D, { size = 18, color = 'black', outline = false, fill = false} = {}) {
    const radius = size / 2;
    
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
    ctx.fill();

    if (outline) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'yellow';
      ctx.arc(this.x, this.y, radius * 0.6, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (fill) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, radius * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = 'yellow';
      ctx.fill();
    }
  }
}

export default Point;