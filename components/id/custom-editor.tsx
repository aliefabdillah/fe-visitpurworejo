"use client";
/* eslint-disabled */
import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Editor from "../../ckeditor5";

export default function CustomEditor({
  initialData,
}: {
  initialData?: string;
}) {
  // const [editorData, setEditorData] = useState(initialData);
  return (
    <div className="prose lg:max-w-[760px] xl:max-w-full">
      <CKEditor
        editor={Editor}
      />
    </div>
  );
}
