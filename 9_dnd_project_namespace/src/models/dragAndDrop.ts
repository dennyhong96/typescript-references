// DRAG & DROP INTERFACES

namespace App {
  export interface Draggable {
    dragStartHandler: (evt: DragEvent) => void;
    dragEndHandler: (evt: DragEvent) => void;
  }

  export interface DragTarget {
    dragOverHandler: (evt: DragEvent) => void;
    dropHandler: (evt: DragEvent) => void;
    dragLeaveHandler: (evt: DragEvent) => void;
  }
}
