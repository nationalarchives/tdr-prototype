interface IFileWithPath {
  file: File;
  path: string;
}

type IEntryWithPath = IFileWithPath | IDirectoryWithPath;
type IDirectoryWithPath = Pick<IFileWithPath, "path">;

function isFile(entry: IEntryWithPath): entry is IFileWithPath {
  return (entry as IFileWithPath).file !== undefined;
}

function isDirectory(entry: IEntryWithPath): entry is IFileWithPath {
  return !isFile(entry);
}
interface IReader {
  readEntries: (callbackFunction: (entry: IWebkitEntry[]) => void) => void;
}

interface IWebkitEntry extends DataTransferItem {
  createReader: () => IReader;
  isFile: boolean;
  isDirectory: boolean;
  fullPath: string;
  name?: string;
  file: (success: (file: File) => void) => void;
}

const displaySelectionSuccessMessage = (
  folderName: string,
  numberOfFiles: number
) => {
  // const selectionArea = document.querySelector("#selection-area");
  // const successMessageContainer: HTMLElement | null = document.querySelector(
  //   "#item-selection-success-container"
  // );
  // selectionArea?.classList.remove("govuk-form-group--error");
  // Object.values(warningMessagesToHide).forEach(
  //   (warningMessageElement: HTMLElement | null) => {
  //     warningMessageElement?.setAttribute("hidden", "true");
  //   }
  // );
  // successMessageContainer?.removeAttribute("hidden");
  // successMessage?.removeAttribute("hidden");
  // successMessage?.focus();
};

export class FolderUpload {
  private readonly dropzone: HTMLElement;
  private readonly itemRetriever: HTMLInputElement;

  constructor(root: HTMLElement) {
    this.itemRetriever = root.querySelector(".js-drag-and-drop-input")!;
    this.dropzone = root.querySelector(".js-drag-and-drop-zone")!;
  }

  initialise: () => void = () => {
    this.addDropzoneHighlighter();
    this.addButtonHighlighter();
    this.addFolderListener();
  };

  addFolderListener: () => void = () => {
    this.dropzone.addEventListener("drop", this.handleDroppedItems);
    // this.itemRetriever.addEventListener("change", this.handleSelectedItems);
  };

  addDropzoneHighlighter: () => void = () => {
    this.dropzone.addEventListener("dragover", (ev) => {
      ev.preventDefault();
      this.dropzone.classList.add("drag-and-drop__dropzone--dragover");
    });

    this.dropzone.addEventListener("dragleave", () => {
      this.removeDragover();
    });
  };

  addButtonHighlighter: () => void = () => {
    const itemRetrieverLabel: HTMLLabelElement = this.itemRetriever.labels![0];
    this.itemRetriever.addEventListener("focus", () => {
      itemRetrieverLabel.classList.add("drag-and-drop__button--highlight");
    });

    this.itemRetriever.addEventListener("blur", () => {
      itemRetrieverLabel.classList.remove("drag-and-drop__button--highlight");
    });
  };

  removeDragover: () => void = () => {
    this.dropzone.classList.remove("drag-and-drop__dropzone--dragover");
  };

  private getParentFolderName(folder: IEntryWithPath[]) {
    const firstItem: IEntryWithPath = folder.filter((f) => isFile(f))[0];
    const relativePath: string = firstItem.path;
    const splitPath: string[] = relativePath.split("/");
    return splitPath[0];
  }

  handleDroppedItems: (ev: DragEvent) => Promise<any> = async (ev) => {
    ev.preventDefault();
    const items: DataTransferItemList = ev.dataTransfer?.items!;

    const droppedItem: DataTransferItem | null = items[0];
    const webkitEntry = droppedItem.webkitGetAsEntry();

    const filesAndFolders: IDirectoryWithPath[] = await this.getAllFiles(
      webkitEntry as unknown as IWebkitEntry,
      []
    );

    displaySelectionSuccessMessage(
      webkitEntry!.name,
      filesAndFolders.filter((f) => isFile(f)).length
    );
    // const files = filesAndFolders.filter((f) =>
    //   isFile(f)
    // ) as IFileWithPath[];
    // const folderCheck = this.checkIfFolderHasFiles(files);
    // if (!isError(folderCheck)) {
    //   this.selectedFiles = filesAndFolders;
    //   addFolderSelectionSuccessMessage(
    //     webkitEntry!.name,
    //     this.selectedFiles.filter((f) => isFile(f)).length
    //   );
    // } else {
    //   return folderCheck;
    // }
  };

  getEntryBatch: (reader: IReader) => Promise<IWebkitEntry[]> = (reader) => {
    return new Promise<IWebkitEntry[]>((resolve) => {
      reader.readEntries((entries) => resolve(entries));
    });
  };

  getFileFromEntry: (entry: IWebkitEntry) => Promise<IFileWithPath> = (
    entry
  ) => {
    return new Promise<IFileWithPath>((resolve) => {
      entry.file((file) =>
        resolve({
          file,
          path: entry.fullPath,
        })
      );
    });
  };

  getEntriesFromReader: (reader: IReader) => Promise<IWebkitEntry[]> = async (
    reader
  ) => {
    let allEntries: IWebkitEntry[] = [];

    let nextBatch = await this.getEntryBatch(reader);

    while (nextBatch.length > 0) {
      allEntries = allEntries.concat(nextBatch);
      nextBatch = await this.getEntryBatch(reader);
    }

    return allEntries;
  };

  getAllFiles: (
    entry: IWebkitEntry | null,
    fileInfoInput: IEntryWithPath[]
  ) => Promise<IEntryWithPath[]> = async (entry, fileInfoInput) => {
    const reader: IReader = entry!.createReader();
    const entries: IWebkitEntry[] = await this.getEntriesFromReader(reader);
    if (entry!.isDirectory && entries.length === 0) {
      fileInfoInput.push({ path: entry!.fullPath });
    }
    for (const entry of entries) {
      if (entry.isDirectory) {
        await this.getAllFiles(entry, fileInfoInput);
      } else {
        const file: IFileWithPath = await this.getFileFromEntry(entry);
        fileInfoInput.push(file);
      }
    }
    return fileInfoInput;
  };
}
