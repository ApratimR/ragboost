import { model, Schema } from "mongoose";
import z from "zod";

const promptTemplatesSchema = new Schema({
    collection_id: {
        type: String,
        required: true,
        index: true
    },

    // Template details
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: false,
        maxlength: 500,
        default: null
    },

    // The actual prompt template
    system_prompt: {
        type: String,
        required: false,
        maxlength: 2000,
        default:"You are an intelligent assistant answering user queries using retrieved context documents. Always base your responses strictly on the provided documents. If the answer is not available or cannot be confidently derived, say so. Cite your sources where appropriate, avoid speculation, and maintain a clear and concise tone."
    },
    user_prompt_template: {
        type: String,
        required: true,
        maxlength: 2000
    },

    is_default: {
        type: Boolean,
        required: true,
        default: false,
        index: true
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true
    },

    // Metadata
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

// Ensure only one default template per collection
promptTemplatesSchema.index({ collection_id: 1, is_default: 1 }, { 
  unique: true, 
  partialFilterExpression: { is_default: true } 
});

const promptTemplate = model('Collection', promptTemplatesSchema);


export default promptTemplate;