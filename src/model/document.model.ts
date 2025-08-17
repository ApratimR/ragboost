import { model, Schema } from "mongoose";
import z from "zod";

const documentSchema = new Schema({
    filename: {
        type: String,
        required: true,
        maxlength: 255
    },
    original_filename: {
        type: String,
        required: true,
        maxlength: 255
    },
    content_type: {
        type: String,
        required: true,
        enum: [
            'text/plain',
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/markdown'
        ]
    },
    file_size: {
        type: Number,
        required: true,
        min: 0,
        max: 52428800 // 50MB in bytes
    },
    file_hash: {
        type: String,
        required: true,
        index: true
    },

    collection_id: {
        type: String,
        required: true,
        index: true
    },

    metadata: {
        type: Schema.Types.Mixed,
        required: false,
        default: {}
    },

    status: {
        type: String,
        required: true,
        default: 'queued',
        enum: ['queued', 'processing', 'completed', 'failed'],
        index: true
    },
    chunk_count: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    processing_started_at: {
        type: Date,
        required: false,
        default: null
    },
    processing_completed_at: {
        type: Date,
        required: false,
        default: null
    },
    processing_time_ms: {
        type: Number,
        required: false,
        default: null,
        min: 0
    },

    // Error handling
    error_message: {
        type: String,
        required: false,
        default: null,
        maxlength: 1000
    },
    retry_count: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    max_retries: {
        type: Number,
        required: true,
        default: 3,
        min: 0,
        max: 10
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now
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
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const Document = model('Document', documentSchema);


export default Document