import Graph from "./math/graph";
import { getNearestPoint } from "./math/utils";
import Point from "./primitives/point";
import Segment from "./primitives/segment";

type IGraphEditor = {
  canvas: HTMLCanvasElement;
  graph: Graph;
  ctx: CanvasRenderingContext2D;
  selected: Point | null;
  hovered: Point | null;
  dragging: boolean | null;
  display(): void;
}

class GraphEditor implements IGraphEditor {
  canvas: HTMLCanvasElement;
  graph: Graph;
  ctx: CanvasRenderingContext2D;
  selected: Point | null;
  hovered: Point | null;
  dragging: boolean | null;
  mousePoint: Point;

  constructor(canvas: HTMLCanvasElement, graph: Graph) {
    this.canvas = canvas;
    this.graph = graph;

    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    this.selected = null;
    this.hovered = null;
    this.dragging = null;
    this.mousePoint = new Point(0, 0);

    this.#addEventListeners();
  }

  #addEventListeners(): void {
    this.canvas.addEventListener('mousedown', (evt: MouseEvent) => {
      // check if we clicked with the right mouse button
      if (evt.button === 2) {
        if (this.hovered) {
          this.#removePoint(this.hovered);
        } else {
          this.selected = null;
        }
      }

      // check if we clicked with the left mouse button
      if (evt.button !== 0) {
        return;
      }

      if (this.hovered) {
        this.#select(this.hovered);
        this.dragging = true;
        return;
      }

      this.graph.addPoint(this.mousePoint);
      this.#select(this.mousePoint);
      this.hovered = this.mousePoint;
    });

    this.canvas.addEventListener('mousemove', (evt: MouseEvent) => {
      this.mousePoint = new Point(evt.offsetX, evt.offsetY);
      this.hovered = getNearestPoint(this.mousePoint, this.graph.points, 15);

      if (this.dragging && this.selected) {
        this.selected.x = this.mousePoint.x;
        this.selected.y = this.mousePoint.y;
      }
    });

    this.canvas.addEventListener('mouseup', () => this.dragging = false);

    this.canvas.addEventListener('contextmenu', (evt: MouseEvent) => {
      evt.preventDefault();
    });
  }

  #select(point: Point) {
    if (this.selected) {
      this.graph.tryAddSegment(new Segment(this.selected, point));
    }

    this.selected = point;
  }

  #removePoint(point: Point): void {
    this.graph.removePoint(point);
    this.hovered = null;

    if (this.selected?.equals(point)) {
      this.selected = null;
    }
  }

  display(): void {
    this.graph.draw(this.ctx);

    if (this.hovered) {
      this.hovered.draw(this.ctx, {
        fill: true,
      });
    }
    
    if (this.selected) {
      /**
       * When we hover over an existing point we lock to that point
       * as the intended point. Otherwise we use the mouse point.
       */
      const intendedPoint = this.hovered ? this.hovered : this.mousePoint;
      new Segment(this.selected, intendedPoint).draw(this.ctx, {
        dash: [3, 3]
      });

      this.selected.draw(this.ctx, {
        outline: true,
      });
    }
  }
}

export default GraphEditor;