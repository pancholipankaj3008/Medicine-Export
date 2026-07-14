import { useRef, useState } from "react";

const ImageUpload = ({ value, onChange }) => {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file) => {
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pharma_upload");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dqqv5kkst/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      onChange(data.secure_url);
    } catch (err) {
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-slate-500 uppercase">
        Product Image
      </label>

      <div className="flex gap-3">
        <input
          type="text"
          value={value}
          readOnly
          placeholder="Image URL will appear here"
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200"
        />

        <button
          type="button"
          onClick={() => fileRef.current.click()}
          className="px-4 py-3 rounded-xl bg-slate-100 border font-semibold"
        >
          Upload
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => uploadImage(e.target.files[0])}
      />

      {uploading && (
        <p className="text-xs text-blue-500">Uploading image...</p>
      )}

      {value && (
        <img
          src={value}
          alt="Preview"
          className="w-28 h-28 rounded-lg object-cover border"
        />
      )}
    </div>
  );
};

export default ImageUpload;
