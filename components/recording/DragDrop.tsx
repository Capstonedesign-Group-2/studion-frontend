import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import { boolean } from "yup"

interface Filetype {
    id: number
    object: File
}
type Props = {
    setAudioFile: Function
}

const DragDrop: React.FC<Props> = ({setAudioFile}) => {
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [file, setFile] = useState<Filetype>()
    const dragRef = useRef<HTMLLabelElement | null>(null)

    const onChangeFile = useCallback((e: ChangeEvent<HTMLInputElement> | any): void => {
        let selectFile: File
        let blobURL: String
        console.log(e.type)
        if(e.type === "drop") {
            selectFile = e.dataTransfer.files[0]
        } else {
            selectFile = e.target.files[0]
        }
        blobURL = window.URL.createObjectURL(selectFile)
        setAudioFile({
            label : selectFile.name,
            url   : blobURL,
            blob  : selectFile
        })
    }, [setAudioFile])
    const handleDragIn = useCallback((e: DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();
    }, [])
    
    const handleDragOut = useCallback((e: DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();
    }, [])

    const handleDragOver = useCallback((e: DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();
    
        if (e.dataTransfer!.files) {
          setIsDragging(true);
        }
    }, []);

    const handleDrop = useCallback((e: DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();
        onChangeFile(e)
        // console.log('handleDrop', e)
        // setAudioFile(e);
        setIsDragging(false);
    }, [onChangeFile]);

    const initDragEvents = useCallback((): void => {    
        if (dragRef.current !== null) {
            dragRef.current.addEventListener("dragenter", handleDragIn);
            dragRef.current.addEventListener("dragleave", handleDragOut);
            dragRef.current.addEventListener("dragover", handleDragOver);
            dragRef.current.addEventListener("drop", handleDrop);
        }
        }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

    const resetDragEvents = useCallback((): void => {
        if (dragRef.current !== null) {
            dragRef.current.removeEventListener("dragenter", handleDragIn);
            dragRef.current.removeEventListener("dragleave", handleDragOut);
            dragRef.current.removeEventListener("dragover", handleDragOver);
            dragRef.current.removeEventListener("drop", handleDrop);
        }
        }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

    useEffect(() => {
        initDragEvents();
        return () => resetDragEvents();
    }, [initDragEvents, resetDragEvents]);

    return (
        <div className="DragDrop">
            <input 
                type="file"
                id="fileUpload"
                style={{  display: "none" }}
                onChange={onChangeFile}
             />

             <label
                className={isDragging ? "DragDrop-File-Dragging" : "DragDrop-File"}
                htmlFor="fileUpload"
                ref={dragRef}
             >
                 <div>파일 첨부</div>
             </label>
        </div>
    )
}

export default DragDrop