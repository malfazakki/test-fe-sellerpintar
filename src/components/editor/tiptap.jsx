"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useForm, Controller } from "react-hook-form";
import {
	Bold,
	Italic,
	Underline as UnderlineIcon,
	AlignLeft,
	AlignCenter,
	AlignRight,
	AlignJustify,
	Image,
	RotateCcw,
	RotateCw,
} from "lucide-react";

const ToolbarButton = ({ onClick, isActive, children, title }) => (
	<button
		type='button'
		onClick={onClick}
		className={`p-2 rounded hover:bg-gray-100 transition-colors ${
			isActive ? "bg-gray-200 text-blue-600" : "text-gray-600"
		}`}
		title={title}
	>
		{children}
	</button>
);

export const RichTextEditor = ({ value, onChange, placeholder = "Start typing..." }) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
		],
		content: value || "",
		onUpdate: ({ editor }) => {
			const html = editor.getHTML();
			onChange(html);
		},
		editorProps: {
			attributes: {
				class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px] p-4",
			},
		},
		immediatelyRender: false,
	});

	useEffect(() => {
		if (editor && value !== editor.getHTML()) {
			editor.commands.setContent(value || "");
		}
	}, [editor, value]);

	if (!editor) {
		return <div className='animate-pulse bg-gray-100 h-96 rounded-lg'></div>;
	}

	return (
		<div className='border border-gray-300 rounded-lg bg-white shadow-sm'>
			{/* Toolbar */}
			<div className='border-b border-gray-200 p-3 flex items-center gap-1 flex-wrap bg-gray-50 rounded-t-lg'>
				{/* Undo/Redo */}
				<div className='flex items-center gap-1 mr-2'>
					<ToolbarButton onClick={() => editor.chain().focus().undo().run()} title='Undo'>
						<RotateCcw size={16} />
					</ToolbarButton>
					<ToolbarButton onClick={() => editor.chain().focus().redo().run()} title='Redo'>
						<RotateCw size={16} />
					</ToolbarButton>
				</div>

				<div className='w-px h-6 bg-gray-300 mx-2'></div>

				{/* Formatting */}
				<div className='flex items-center gap-1 mr-2'>
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleBold().run()}
						isActive={editor.isActive("bold")}
						title='Bold'
					>
						<Bold size={16} />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleItalic().run()}
						isActive={editor.isActive("italic")}
						title='Italic'
					>
						<Italic size={16} />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleUnderline().run()}
						isActive={editor.isActive("underline")}
						title='Underline'
					>
						<UnderlineIcon size={16} />
					</ToolbarButton>
				</div>

				<div className='w-px h-6 bg-gray-300 mx-2'></div>

				{/* Alignment */}
				<div className='flex items-center gap-1 mr-2'>
					<ToolbarButton
						onClick={() => editor.chain().focus().setTextAlign("left").run()}
						isActive={editor.isActive({ textAlign: "left" })}
						title='Align Left'
					>
						<AlignLeft size={16} />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor.chain().focus().setTextAlign("center").run()}
						isActive={editor.isActive({ textAlign: "center" })}
						title='Align Center'
					>
						<AlignCenter size={16} />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor.chain().focus().setTextAlign("right").run()}
						isActive={editor.isActive({ textAlign: "right" })}
						title='Align Right'
					>
						<AlignRight size={16} />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor.chain().focus().setTextAlign("justify").run()}
						isActive={editor.isActive({ textAlign: "justify" })}
						title='Justify'
					>
						<AlignJustify size={16} />
					</ToolbarButton>
				</div>

				<div className='w-px h-6 bg-gray-300 mx-2'></div>

				{/* Image */}
				<ToolbarButton
					onClick={() => {
						const url = window.prompt("Enter image URL:");
						if (url) {
							editor.chain().focus().setImage({ src: url }).run();
						}
					}}
					title='Insert Image'
				>
					<Image size={16} alt='Tiptap' />
				</ToolbarButton>
			</div>

			{/* Editor Content */}
			<div className='min-h-[400px] bg-white'>
				<EditorContent editor={editor} className=' rounded-b-lg' />
			</div>

			{/* Word Count */}
			<div className='border-t border-gray-200 px-4 py-2 text-sm text-gray-500 bg-gray-50 rounded-b-lg'>
				{editor.storage.characterCount?.words() || 0} Words
			</div>
		</div>
	);
};

// Demo Form Component
const DemoForm = () => {
	const { control, handleSubmit, watch } = useForm({
		defaultValues: {
			content:
				"<p>In the ever-evolving world of digital product design, collaboration between designers and developers has always been a crucial—yet often challenging—part of the process. In April 2025, Figma introduced Dev Mode, a powerful new feature aimed at streamlining that collaboration more than ever before.</p>",
		},
	});

	const watchedContent = watch("content");

	const onSubmit = (data) => {
		console.log("Form submitted:", data);
		alert("Content saved! Check console for full content.");
	};

	return (
		<div className='max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen'>
			<div className='bg-white rounded-lg shadow-lg p-6'>
				<h1 className='text-2xl font-bold text-gray-800 mb-6'>Rich Text Editor Demo</h1>

				<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>Content</label>
						<Controller
							name='content'
							control={control}
							render={({ field }) => (
								<RichTextEditor
									value={field.value}
									onChange={field.onChange}
									placeholder='Start writing your content...'
								/>
							)}
						/>
					</div>

					<div className='flex justify-between items-center pt-4'>
						<button
							type='submit'
							className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
						>
							Save Content
						</button>

						<div className='text-sm text-gray-500'>Auto-save enabled</div>
					</div>
				</form>

				{/* Preview Section */}
				<div className='mt-8 pt-6 border-t border-gray-200'>
					<h2 className='text-lg font-semibold text-gray-800 mb-4'>Live Preview:</h2>
					<div
						className='prose prose-sm max-w-none p-4 bg-gray-50 rounded-lg border'
						dangerouslySetInnerHTML={{ __html: watchedContent }}
					/>
				</div>
			</div>
		</div>
	);
};

export default DemoForm;
