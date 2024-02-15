export type EventType = {
  id: string;
  title: string;
  description: string;
  x: string;
  y: string;
  initialX: string;
  initialY: string;
  initialsSet: boolean;
  colour: string;
}

export type DraggableData = {
  node: HTMLElement,
  // lastX + deltaX === x
  x: number, y: number,
  deltaX: number, deltaY: number,
  lastX: number, lastY: number
};