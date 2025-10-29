import type { ChangeEvent, MouseEvent } from "react";
import { FaTimes, FaImage } from "react-icons/fa";

interface ImageUploaderProps {
  file: File | null;
  setFile: (file: File | null) => void;
  clase?: string;
  defaultImage?: string; // ✅ Nueva prop opcional
}

export const ImageUploaderCustom = ({
  file,
  setFile,
  clase = "1",
  defaultImage, // ✅ Se recibe la imagen por defecto
}: ImageUploaderProps): JSX.Element => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = event.target.files?.[0] ?? null;
    setFile(selectedFile);
  };

  const handleDelete = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setFile(null);
  };

  // ✅ Mostrar preview de imagen nueva o imagen actual (desde el backend)
  const previewUrl = file
    ? URL.createObjectURL(file)
    : defaultImage
      ? defaultImage.startsWith("http")
        ? defaultImage
        : `http://localhost:4000${defaultImage}`
      : "";

  return (
    <div className="w-full border p-4 flex flex-col items-center gap-2">
      {!file && !defaultImage && (
        <label
          htmlFor={`imagen${clase}`}
          className="cursor-pointer flex items-center gap-2 text-white bg-blue-500 px-4 py-2 rounded"
        >
          <FaImage />
          Seleccionar Imagen
        </label>
      )}

      <input
        accept="image/*"
        id={`imagen${clase}`}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />

      {previewUrl && (
        <div className="flex flex-col items-center gap-2">
          <img
            src={previewUrl}
            alt="preview"
            className="w-32 h-32 object-cover rounded"
          />
          <div className="flex gap-2 items-center">
            {file && (
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={handleDelete}
              >
                <FaTimes />
              </button>
            )}
            <span className="text-white text-sm">
              {file ? file.name : "Imagen actual"}
            </span>
          </div>
        </div>
      )}

      {/* Mostrar botón de reemplazo cuando ya hay imagen actual */}
      {!file && defaultImage && (
        <label
          htmlFor={`imagen${clase}`}
          className="cursor-pointer mt-2 flex items-center gap-2 text-white bg-green-500 px-3 py-1 rounded hover:bg-green-600 transition"
        >
          <FaImage />
          Reemplazar Imagen
        </label>
      )}
    </div>
  );
};
