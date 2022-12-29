export interface CreateNodeI {
  parentClass: string;
  draw(): void
}

export function getElement(selector: string, parent: Element | Document = document): Element {
  const element = parent.querySelector(selector);
  if (!(element instanceof Element)) {
    throw new Error('element is not html element!');
  }
  return element;
}