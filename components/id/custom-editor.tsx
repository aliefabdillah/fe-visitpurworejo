"use client";
/* eslint-disabled */
import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Editor from "../../ckeditor5";

export default function CustomEditor({
  initialData,
}: {
  initialData?: string;
}) {
  const [editorData, setEditorData] = useState<string>(initialData || "");

  const handleEditorData = (event: any, editor: any) => {
    const data = editor.getData();
    setEditorData(data);
  };

  useEffect(() => {
    // Update editorData when initialData changes
    setEditorData(initialData || "");
  }, [initialData]);

  return (
    <div className="prose lg:max-w-[760px] xl:max-w-full">
      <CKEditor editor={Editor} data={editorData} onChange={handleEditorData} />
      <input
        type="text"
        placeholder="Type here"
        name="content"
        className="input input-bordered w-full"
        value={editorData}
        hidden
        // readOnly
      />
    </div>
  );
}
