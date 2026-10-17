import mongoose from 'mongoose';

const communityProjectSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    category: { 
      type: String, 
      required: true 
    },
    suitableFor: { 
      type: [String], 
      default: [] 
    },
    suggestedSkills: { 
      type: [String], 
      default: [] 
    },
    difficulty: { 
      type: String, 
      required: true 
    },
    estimatedDuration: { 
      type: String, 
      required: true 
    },
    type: { 
      type: String, 
      default: 'sample' 
    },
    verified: { 
      type: Boolean, 
      default: false 
    },
  },
  { 
    timestamps: true 
  }
);

const CommunityProject = mongoose.model('CommunityProject', communityProjectSchema);

export default CommunityProject;