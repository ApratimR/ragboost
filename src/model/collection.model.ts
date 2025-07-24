import { model, Schema } from "mongoose";
import z from "zod";

const collectionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 50,
        match: /^[a-zA-Z0-9-_]+$/
    },
    description: {
        type: String,
        required: false,
        maxlength: 500,
        default: null
    },

    // Configuration
    embedding_model: {
        type: String,
        required: true,
        default: 'text-embedding-3-small',
        enum: ['text-embedding-ada-002', 'text-embedding-3-small', 'text-embedding-3-large']
    },
    chunk_size: {
        type: Number,
        required: true,
        default: 1000,
        min: 100,
        max: 4000
    },
    chunk_overlap: {
        type: Number,
        required: true,
        default: 200,
        min: 0,
        max: 1000
    },

    // Statistics
    document_count: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    vector_count: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    total_file_size: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },

    // Timestamps
    created_at: {
        type: Date,
        required: true,
        default: null
    },
    updated_at: {
        type: Date,
        required: true,
        default: null
    },

    // Soft delete
    is_deleted: {
        type: Boolean,
        required: true,
        default: false,
        index: true
    },
    deleted_at: {
        type: Date,
        required: false,
        default: null
    }
});

const collectionValidationSchema = z.object({
    name: z.string().min(3).max(50).regex(/^[a-zA-Z0-9-_]+$/),
    description: z.string().max(500).optional(),
    embedding_model: z.enum(['text-embedding-ada-002', 'text-embedding-3-small', 'text-embedding-3-large']).default('text-embedding-3-small'),
    chunk_size: z.number().min(100).max(4000).default(1000),
    chunk_overlap: z.number().min(0).max(1000).default(200),
    created_at: z.date().default(() => new Date()),
    updated_at: z.date().default(() => new Date()),
})

const Collection = model('Collection', collectionSchema);

export { collectionValidationSchema };
export default Collection;