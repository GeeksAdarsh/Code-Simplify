interface EditorSlot {
  get: () => string;
  set: (value: string) => void;
}

interface ShareBus {
  root: HTMLDivElement | null;
  editors: EditorSlot[];
}

function bus(): ShareBus {
  const host = window as Window & { __csShareBus?: ShareBus };
  if (!host.__csShareBus) host.__csShareBus = { root: null, editors: [] };
  return host.__csShareBus;
}

export function setShareRoot(root: HTMLDivElement | null) {
  bus().root = root;
}

export function shareRoot() {
  return bus().root;
}

export function registerShareEditor(get: () => string, set: (value: string) => void) {
  const slot = { get, set };
  bus().editors.push(slot);
  return () => {
    const current = bus();
    current.editors = current.editors.filter((item) => item !== slot);
  };
}

export function readShareEditors() {
  return bus().editors.map((slot) => slot.get());
}

export function writeShareEditors(values: string[]) {
  values.forEach((value, index) => bus().editors[index]?.set(value));
}

export function shareEditorCount() {
  return bus().editors.length;
}
