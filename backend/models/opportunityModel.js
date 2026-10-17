import mongoose from 'mongoose';

const opportunitySchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    category: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    type: { 
      type: String, 
      required: true 
    },
    status: { 
      type: String, 
      default: 'sample' 
    },
    verified: { 
      type: Boolean, 
      default: false 
    },
    eligibility: { 
      type: String, 
      required: true 
    },
  },
  { 
    timestamps: true 
  }
);

const Opportunity = mongoose.model('Opportunity', opportunitySchema);

export default Opportunity;