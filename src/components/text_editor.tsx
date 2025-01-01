import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import React from 'react';

type TextEditorProps = {
    editorContent: string;
    setEditorContent: React.Dispatch<React.SetStateAction<string>>;
}

const TextEditor: React.FC<TextEditorProps> = React.memo(({ editorContent, setEditorContent}: TextEditorProps) => {

    return (
        <>
        <Editor 
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
            initialValue='<p>This is the initial content of the editor</p>'
            init={{
                height: 500,
                menubar: false,
                plugins: 'advlist autolink lists link image table paste',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | table',
            }}
            onEditorChange={(e) => {setEditorContent(e); console.log(typeof(editorContent)); console.log(editorContent);}}
        />
        </>
    )
})

export default TextEditor;