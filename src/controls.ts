import Graph from "./math/graph";
import Point from "./primitives/point";
import Segment from "./primitives/segment";

export default (graph: Graph, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const ButtonAddPoint = document.getElementById('add-point') as HTMLButtonElement;
  ButtonAddPoint.addEventListener("click", () => {
    const success = graph.tryAddPoint(
      new Point(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      )
    );

    if (!success) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    graph.draw(ctx);
  }, false);

  const ButtonAddSegment = document.getElementById('add-segment') as HTMLButtonElement;
  ButtonAddSegment.addEventListener("click", () => {
    const index1 = Math.floor(Math.random() * graph.points.length);
    const index2 = Math.floor(Math.random() * graph.points.length);

    if (index1 === index2) {
      return;
    }
    
    const success = graph.tryAddSegment(
      new Segment(graph.points[index1], graph.points[index2])
    );

    console.log(success);

    if (!success) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    graph.draw(ctx);
  }, false);

  const ButtonRemoveSegment = document.getElementById('remove-segment') as HTMLButtonElement;
  ButtonRemoveSegment.addEventListener("click", () => {
    if (graph.segments.length === 0) {
      console.log('No segments');
      return;
    }

    const index = Math.floor(Math.random() * graph.segments.length);
    graph.removeSegment(graph.segments[index]);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    graph.draw(ctx);
  }, false);

  const ButtonRemovePoint = document.getElementById('remove-point') as HTMLButtonElement;
  ButtonRemovePoint.addEventListener("click", () => {
    if (graph.points.length === 0) {
      console.log('No points');
      return;
    }

    const index = Math.floor(Math.random() * graph.points.length);
    graph.removePoint(graph.points[index]);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    graph.draw(ctx);
  }, false);

  const ButtonRemoveAll = document.getElementById('remove-all') as HTMLButtonElement;
  ButtonRemoveAll.addEventListener("click", () => {
    graph.dispose();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    graph.draw(ctx);
  }, false);
}