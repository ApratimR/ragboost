import { model, Schema } from "mongoose";
import z from "zod";

const batchJobsSchema = new Schema({
    collection_id: {
        type: String,
        required: true,
        index: true
    },

    // Batch information
    total_files: {
        type: Number,
        required: true,
        min: 1,
        max: 20
    },
    completed_files: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    failed_files: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },

    // Status tracking
    status: {
        type: String,
        required: true,
        default: 'queued',
        enum: ['queued', 'processing', 'completed', 'failed', 'cancelled'],
        index: true
    },

    // Associated documents
    document_ids: [{
        type: String,
        required: true
    }],

    // Timing information
    started_at: {
        type: Date,
        required: false,
        default: null
    },
    completed_at: {
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
    error_summary: {
        type: String,
        required: false,
        default: null,
        maxlength: 1000
    },

    failed_documents: [{
        filename: {
            type: String,
            required: false,
            maxlength: 255
        },
        error_message: {
            type: String,
            required: false,
            maxlength: 500
        }
    }],

    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now
    }
},{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})