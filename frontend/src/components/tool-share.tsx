"use client";

import { useEffect, useState, type ReactNode } from "react";
import { decodeShareHash, encodeShareHash, type SharePayload } from "@/lib/share-link";
import { readShareEditors, setShareRoot, shareEditorCount, shareRoot, writeShareEditors } from "@/lib/share-bus";

const SKIP_INPUT_TYPES = new Set(["button", "submit", "reset", "file", "hidden", "image"]);

type ShareControl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

function isShareControl(node: Element): node is ShareControl {
  return node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement || node instanceof HTMLSelectElement;
}

export function shareableControls(root: ParentNode): ShareControl[] {
  const controls: ShareControl[] = [];
  root.querySelectorAll("input, textarea, select").forEach((node) => {
    if (!isShareControl(node)) return;
    if (node.closest(".monaco-editor")) return;
    if (node.disabled) return;
    if ("readOnly" in node && node.readOnly) return;
    if (node instanceof HTMLInputElement && SKIP_INPUT_TYPES.has(node.type)) return;
    controls.push(node);
  });
  return controls;
}

function readControl(control: ShareControl): string {
  if (control instanceof HTMLInputElement && (control.type === "checkbox" || control.type === "radio")) {
    return control.checked ? "1" : "0";
  }
  return control.value;
}

function writeControl(control: ShareControl, value: string) {
  if (control instanceof HTMLInputElement && (control.type === "checkbox" || control.type === "radio")) {
    const on = value === "1";
    if (control.checked === on) return;
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "checked")?.set?.call(control, on);
    control.dispatchEvent(new Event("change", { bubbles: true }));
    return;
  }
  if (control.value === value) return;
  const proto =
    control instanceof HTMLTextAreaElement
      ? HTMLTextAreaElement.prototype
      : control instanceof HTMLSelectElement
        ? HTMLSelectElement.prototype
        : HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, "value")?.set?.call(control, value);
  control.dispatchEvent(new Event(control instanceof HTMLSelectElement ? "change" : "input", { bubbles: true }));
}

export function ToolShare({ children }: { children: ReactNode }) {
  useEffect(() => {
    let cancelled = false;
    let timer = 0;
    let tries = 0;

    decodeShareHash(window.location.hash).then((payload) => {
      if (cancelled || !payload) return;

      const tick = () => {
        if (cancelled) return;
        const root = shareRoot();
        const controls = root ? shareableControls(root) : [];
        const editorsReady = shareEditorCount() >= payload.e.length;
        const domReady = payload.d.length === 0 || controls.length > 0;
        if (!root || !editorsReady || !domReady) {
          tries += 1;
          if (tries < 40) timer = window.setTimeout(tick, 100);
          return;
        }
        writeShareEditors(payload.e);
        payload.d.forEach((value, index) => {
          const control = controls[index];
          if (control) writeControl(control, value);
        });
      };

      tick();
    });

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  return children;
}

export function ToolShareRoot({ children }: { children: ReactNode }) {
  return (
    <div ref={setShareRoot} className="mt-8">
      {children}
    </div>
  );
}

export function ShareLinkButton() {
  const [notice, setNotice] = useState("");

  async function onShare() {
    const root = shareRoot();
    if (!root) return;
    const payload: SharePayload = {
      v: 1,
      e: readShareEditors(),
      d: shareableControls(root).map(readControl),
    };
    try {
      const hash = await encodeShareHash(payload);
      const url = `${window.location.origin}${window.location.pathname}${window.location.search}#${hash}`;
      window.history.replaceState(null, "", `#${hash}`);
      try {
        await navigator.clipboard.writeText(url);
        setNotice("Link copied");
      } catch {
        setNotice("Link is in the address bar");
      }
    } catch {
      setNotice("Too large to share in a link");
    }
    window.setTimeout(() => setNotice(""), 2500);
  }

  return (
    <div className="flex shrink-0 items-center gap-2">
      <button
        type="button"
        onClick={onShare}
        className="btn btn-secondary h-8 px-3 text-xs"
        title="Copy a link that opens this exact view. Send it to anyone or save it for later."
      >
        Share
      </button>
      {notice && <span className="text-xs text-muted">{notice}</span>}
    </div>
  );
}
