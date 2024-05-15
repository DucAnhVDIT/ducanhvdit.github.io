// import './styles.scss'

// import { TiptapCollabProvider } from '@hocuspocus/provider'
// import CharacterCount from '@tiptap/extension-character-count'
// import Collaboration from '@tiptap/extension-collaboration'
// import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
// import Highlight from '@tiptap/extension-highlight'
// import TaskItem from '@tiptap/extension-task-item'
// import TaskList from '@tiptap/extension-task-list'
// import { EditorContent, useEditor } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import React, {
//   useCallback, useEffect,
//   useState,
// } from 'react'



// export default () => {
//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         history: false,
//       }),
//       Highlight,
//       TaskList,
//       TaskItem,
//       CharacterCount.configure({
//         limit: 10000,
//       }),
//     ],
//   })

//   return (
//     <div className="editor">
//       {editor && <MenuBar editor={editor} />}
//       <EditorContent className="editor__content" editor={editor} />
//     </div>
//   )
// }