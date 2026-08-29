import { create } from "zustand";
import { createDefaultDocument } from "@/lib/defaults";
import { createDefaultBlock } from "@/lib/defaults";
import { safeParseProfileDocument, type ProfileBlock, type ProfileDocument } from "@/lib/schema";
import type { BlockType } from "@/lib/schema";

const STORAGE_KEY = "profilio:document:v1";
const MAX_HISTORY = 50;

type ProfileStore = {
  document: ProfileDocument;
  past: ProfileDocument[];
  future: ProfileDocument[];

  addBlock: (type: BlockType) => void;
  removeBlock: (id: string) => void;
  updateBlock: (id: string, updater: (block: ProfileBlock) => ProfileBlock) => void;
  reorderBlocks: (fromIndex: number, toIndex: number) => void;
  setTheme: (themeId: string) => void;
  setColorMode: (mode: "dark" | "light") => void;
  setGithubUsername: (username: string) => void;
  replaceDocument: (doc: ProfileDocument) => void;
  resetDocument: () => void;

  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
};

function loadInitialDocument(): ProfileDocument {
  if (typeof window === "undefined") {
    return createDefaultDocument();
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultDocument();
    const parsed = safeParseProfileDocument(JSON.parse(raw));
    return parsed.success ? parsed.data : createDefaultDocument();
  } catch {
    return createDefaultDocument();
  }
}

function persist(doc: ProfileDocument) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(doc));
  } catch {
    // localStorage can throw in private-browsing/quota-exceeded contexts; autosave is best-effort.
  }
}

export const useProfileStore = create<ProfileStore>((set, get) => ({
  document: loadInitialDocument(),
  past: [],
  future: [],

  addBlock: (type) => {
    set((state) => {
      const nextDoc: ProfileDocument = {
        ...state.document,
        blocks: [...state.document.blocks, createDefaultBlock(type)],
      };
      persist(nextDoc);
      return {
        document: nextDoc,
        past: [...state.past, state.document].slice(-MAX_HISTORY),
        future: [],
      };
    });
  },

  removeBlock: (id) => {
    set((state) => {
      const nextDoc: ProfileDocument = {
        ...state.document,
        blocks: state.document.blocks.filter((b) => b.id !== id),
      };
      persist(nextDoc);
      return {
        document: nextDoc,
        past: [...state.past, state.document].slice(-MAX_HISTORY),
        future: [],
      };
    });
  },

  updateBlock: (id, updater) => {
    set((state) => {
      const nextDoc: ProfileDocument = {
        ...state.document,
        blocks: state.document.blocks.map((b) => (b.id === id ? updater(b) : b)),
      };
      persist(nextDoc);
      return {
        document: nextDoc,
        past: [...state.past, state.document].slice(-MAX_HISTORY),
        future: [],
      };
    });
  },

  reorderBlocks: (fromIndex, toIndex) => {
    set((state) => {
      const blocks = [...state.document.blocks];
      const [moved] = blocks.splice(fromIndex, 1);
      blocks.splice(toIndex, 0, moved);
      const nextDoc: ProfileDocument = { ...state.document, blocks };
      persist(nextDoc);
      return {
        document: nextDoc,
        past: [...state.past, state.document].slice(-MAX_HISTORY),
        future: [],
      };
    });
  },

  setTheme: (themeId) => {
    set((state) => {
      const nextDoc: ProfileDocument = { ...state.document, themeId };
      persist(nextDoc);
      return {
        document: nextDoc,
        past: [...state.past, state.document].slice(-MAX_HISTORY),
        future: [],
      };
    });
  },

  setColorMode: (colorMode) => {
    set((state) => {
      const nextDoc: ProfileDocument = { ...state.document, colorMode };
      persist(nextDoc);
      return {
        document: nextDoc,
        past: [...state.past, state.document].slice(-MAX_HISTORY),
        future: [],
      };
    });
  },

  setGithubUsername: (githubUsername) => {
    set((state) => {
      const nextDoc: ProfileDocument = { ...state.document, githubUsername };
      persist(nextDoc);
      return {
        document: nextDoc,
        past: [...state.past, state.document].slice(-MAX_HISTORY),
        future: [],
      };
    });
  },

  replaceDocument: (doc) => {
    set((state) => {
      persist(doc);
      return {
        document: doc,
        past: [...state.past, state.document].slice(-MAX_HISTORY),
        future: [],
      };
    });
  },

  resetDocument: () => {
    const fresh = createDefaultDocument();
    set((state) => {
      persist(fresh);
      return { document: fresh, past: [...state.past, state.document].slice(-MAX_HISTORY), future: [] };
    });
  },

  undo: () => {
    const { past, document, future } = get();
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    persist(previous);
    set({
      document: previous,
      past: past.slice(0, -1),
      future: [document, ...future],
    });
  },

  redo: () => {
    const { future, document, past } = get();
    if (future.length === 0) return;
    const next = future[0];
    persist(next);
    set({
      document: next,
      past: [...past, document].slice(-MAX_HISTORY),
      future: future.slice(1),
    });
  },

  canUndo: () => get().past.length > 0,
  canRedo: () => get().future.length > 0,
}));
