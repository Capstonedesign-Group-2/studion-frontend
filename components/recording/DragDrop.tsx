import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import { boolean } from "yup"
import { AiOutlineCloudUpload } from "react-icons/ai"
import { IoCloudUploadOutline } from "react-icons/io5"
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
        if(e.dataTransfer!.files) {
            setIsDragging(false)
        }
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
                // htmlFor="fileUpload"
                ref={dragRef}
             >
                <div className="border-dashed justify-center items-center border-2 border-gray-300 flex" style={isDragging ? { border: "dashed 2px rgb(52, 211, 153)", background: "rgba(52, 211, 153, 0.2)" } : { }}>
                    <div className="flex flex-col items-center opacity-100 py-4">
                        {/* <AiOutlineCloudUpload className="w-16 h-16" /> */}
                        {/* <p>アップロードしたいファイルを、</p> */}
                        <p>アップロードしたいファイルを、ここにドラッグ＆ドロップ</p>
                        <label htmlFor="fileUpload" className="bg-studion-500 text-white px-4 py-2 rounded-md mt-2 flex hover:bg-studion-600 cursor-pointer">
                            <IoCloudUploadOutline className="mr-2 w-6 h-6" />
                            <p>またはファイルを選択</p>
                        </label>
                    </div>
                </div>
             </label>
        </div>
    )
}

export default DragDrop